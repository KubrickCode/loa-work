#!/usr/bin/env bash
set -euox pipefail

if [[ -z "${EC2_HOST:-}" ]]; then
  echo "Error: EC2_HOST 환경변수가 설정되지 않았습니다."
  exit 1
fi

if [[ -z "${RDS_HOST:-}" ]]; then
  echo "Error: RDS_HOST 환경변수가 설정되지 않았습니다."
  exit 1
fi

if [[ -z "${PROD_DATABASE_URL:-}" ]]; then
  echo "Error: PROD_DATABASE_URL 환경변수가 설정되지 않았습니다."
  exit 1
fi

SSH_KEY_PATH="${SSH_KEY_PATH:-./loa-life-web-key-pair.pem}"
LOCAL_PORT="5433"
ROOT_DIR="$(dirname "$(dirname "$0")")"
BACKEND_DIR="$ROOT_DIR/src/backend"

if [[ ! -f "$SSH_KEY_PATH" ]]; then
  echo "Error: SSH 키 파일을 찾을 수 없습니다: $SSH_KEY_PATH"
  exit 1
fi

echo "🔄 SSH 터널링 시작..."

echo "기존 SSH 터널 프로세스 정리 중..."
pkill -f "ssh.*${LOCAL_PORT}:" || true
sleep 2

ssh -f -N -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null -o ExitOnForwardFailure=yes \
    -L ${LOCAL_PORT}:${RDS_HOST}:5432 -i "$SSH_KEY_PATH" ubuntu@${EC2_HOST}

echo "터널 연결 대기 중..."
for i in {1..10}; do
  if timeout 1 bash -c "echo > /dev/tcp/localhost/${LOCAL_PORT}" 2>/dev/null; then
    echo "✅ SSH 터널 연결 완료: localhost:${LOCAL_PORT} -> ${RDS_HOST}:5432"
    break
  fi
  echo "대기 중... ($i/10)"
  sleep 1
  
  if [ $i -eq 10 ]; then
    echo "Error: SSH 터널 연결에 실패했습니다."
    echo "수동으로 터널을 시작해보세요:"
    echo "ssh -L ${LOCAL_PORT}:${RDS_HOST}:5432 -i \"$SSH_KEY_PATH\" ubuntu@${EC2_HOST}"
    exit 1
  fi
done

echo "🔄 Prisma 클라이언트 생성 중..."
cd "$BACKEND_DIR"
DATABASE_URL="${PROD_DATABASE_URL}" pnpm prisma generate

cleanup() {
  echo ""
  echo "🛑 서버 종료 중..."
  
  jobs -p | xargs -r kill 2>/dev/null || true
  
  echo "🔍 SSH 터널 프로세스 정리 중..."
  pkill -f "ssh.*${LOCAL_PORT}:" 2>/dev/null || true
  
  echo "✅ 정리 완료"
  exit 0
}

trap cleanup SIGINT SIGTERM

echo "🚀 운영 DB로 백엔드 서버 시작..."
echo "종료하려면 Ctrl+C를 누르세요 (SSH 터널도 자동으로 종료됩니다)"
DATABASE_URL="${PROD_DATABASE_URL}" PORT=3001 pnpm start:dev
