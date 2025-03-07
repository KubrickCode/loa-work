# 로직장

로스트아크 게임 내 컨텐츠 노동 가치 인사이트 제공 프로젝트.

## 📌 프로젝트 목표

이 프로젝트는 로스트아크 플레이어들이 게임 내 컨텐츠에 투자하는 시간이 현실 세계의 노동 가치로 환산했을 때 어느 정도의 가치를 가지는지 쉽게 파악할 수 있도록 돕는 것을 목표로 합니다.

## 🚀 주요 기능

- **자동화된 노동 가치 계산**: 게임 내 컨텐츠의 소요 시간과 보상 데이터를 기반으로 현실 세계의 시급으로 자동 환산합니다.
- **시각화된 인사이트 제공**: 계산된 데이터를 직관적인 표와 차트로 시각화하여 사용자가 쉽게 이해할 수 있도록 합니다.
- **사용자 맞춤 설정**: 사용자가 직접 자신의 기준에 맞게 수치를 설정하여(환율, 소요시간, 아이템 가치 등) 개인화된 결과를 얻을 수 있습니다.

## 🛠️ 기술 스택

- **웹 애플리케이션**: TypeScript, GraphQL, ReactJS, NestJS
- **데이터 수집**: Go
- **데이터베이스**: PostgreSQL
- **인프라**: AWS, Nginx, Docker
- **서비스 관리**: 백오피스, Grafana, Prometheus, Loki, Promtail, LogRocket, Sentry
- **배포 자동화**: Github Action
- **이슈 관리**: Github Issue
- **개발 환경**: Dev Container, Docker, VSCode
- **기타 도구**: Chakra UI, Prisma, Gorm, LostArk API, Passport, Jest

## 📂 프로젝트 구조

```
loa-work
├── backend
│   ├── controllers
│   ├── models
│   ├── routes
│   └── services
├── frontend
│   ├── components
│   ├── hooks
│   ├── pages
│   └── utils
└── scripts
```

## 🧑‍💻 설치 및 실행 방법

### 1. 저장소 클론하기

```bash
git clone <저장소 주소>
cd loa-work
```

### 2. 의존성 설치하기

```bash
# 프론트엔드
cd frontend
npm install

# 백엔드
cd ../backend
npm install
```

### 3. 환경 변수 설정하기

`.env.example` 파일을 참고하여 `.env` 파일을 생성하고 필요한 환경 변수를 설정합니다.

### 4. 프로젝트 실행하기

```bash
# 프론트엔드 실행
cd frontend
npm run dev

# 백엔드 실행
cd ../backend
npm run dev
```

## 📈 향후 계획

- 더 다양한 컨텐츠 데이터 추가
- 사용자 데이터 기반의 개인화된 추천 기능 추가
- 모바일 친화적인 UI 개선

## 🤝 기여 방법

이 프로젝트에 기여하고 싶으신 분들은 자유롭게 이슈를 생성하거나 풀 리퀘스트를 보내주세요. 모든 기여는 환영합니다!

## 📄 라이센스

이 프로젝트는 MIT 라이센스를 따릅니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참고하세요.
