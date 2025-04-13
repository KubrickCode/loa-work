set dotenv-load

root_dir := justfile_directory()
frontend_dir := root_dir + "/src/frontend"
backend_dir := root_dir + "/src/backend"

prisma_engine := "binary"

devdb_url := "postgres://postgres:postgres@localhost:5432/postgres"
testdb_url := "postgres://postgres:postgres@localhost:5432/test?pool_timeout=60"

codegen:
  #!/usr/bin/env bash
  set -euox pipefail
  cd "{{ frontend_dir }}"
  yarn codegen

deps: deps-frontend deps-backend

deps-frontend:
  cd "{{ frontend_dir }}" && yarn install

deps-backend:
  cd "{{ backend_dir }}" && yarn install

generate-env:
  #!/usr/bin/env bash
  set -euox pipefail

  if [[ ! -f .doppler.env ]]; then
    echo "Error: .doppler.env file not found."
    exit 1
  fi
  source .doppler.env

  if [[ -z "${DOPPLER_TOKEN_ROOT:-}" ]]; then
    echo "Error: DOPPLER_TOKEN_ROOT not set in .doppler.env."
    exit 1
  fi
  if [[ -z "${DOPPLER_TOKEN_VITE:-}" ]]; then
    echo "Error: DOPPLER_TOKEN_VITE not set in .doppler.env."
    exit 1
  fi

  echo "Downloading secrets for dev_root..."
  doppler secrets download --project loa-work --config dev_root --format env --no-file --token "${DOPPLER_TOKEN_ROOT}" | sed 's/"//g' > .env

  echo "Downloading secrets for dev_vite..."
  doppler secrets download --project loa-work --config dev_vite --format env --no-file --token "${DOPPLER_TOKEN_VITE}" | sed 's/"//g' > "{{ frontend_dir }}/.env"

  echo "Environment files generated successfully."

go-test:
  go list -f '{{{{.Dir}}' -m | xargs -I {} go test {}/...

lint target="all":
  #!/usr/bin/env bash
  set -euox pipefail
  case "{{ target }}" in
    all)
      just lint backend
      just lint frontend
      ;;
    backend)
      cd "{{ backend_dir }}"
      yarn format
      yarn lint
      ;;
    frontend)
      cd "{{ frontend_dir }}"
      yarn eslint --ignore-pattern "generated.tsx" --max-warnings=0 "src/**/*.tsx"
      ;;
    *)
      echo "Unknown target: {{ target }}"
      exit 1
      ;;
  esac

makemigration name:
  just prisma migrate dev --create-only --name {{ name }}

mockgen:
  #!/usr/bin/env bash
  set -euox pipefail
  if ! command -v mockgen &> /dev/null; then
    go install go.uber.org/mock/mockgen@latest
  fi

  cd ./src/go/libs/loa-db
  rm -rf *mock.go
  grep -rl --include='*.go' --exclude='*_mock.go' "interface" . | while read -r file; do
    mockgen -source="$file" -package=loadb -self_package=github.com/KubrickCode/loa-work/src/go/libs/loadb > "${file%.*}_mock.go"
  done

migrate:
  just prisma migrate dev

migrate-prod:
  just prisma migrate deploy

# pgAdmin 실행
# DB 연결 시 호스트명은 `host.docker.internal`를 입력해야 함.
pgadmin:
  #!/usr/bin/env bash
  container=notag_pgadmin
  if docker start $container &> /dev/null; then
    echo "Container $container started."
  else
    echo "Failed to start container $container. Creating a new one..."
    docker run \
      --name $container \
      -e PGADMIN_DEFAULT_EMAIL=admin@example.com \
      -e PGADMIN_DEFAULT_PASSWORD=admin \
      -e PGADMIN_CONFIG_SERVER_MODE=False \
      -e PGADMIN_CONFIG_MASTER_PASSWORD_REQUIRED=False \
      -p 8080:80 \
      dpage/pgadmin4
  fi

prisma *args:
  #!/usr/bin/env bash
  set -euox pipefail
  cd "{{ backend_dir }}"
  yarn prisma {{ args }}

install-psql:
  #!/usr/bin/env bash
  if ! command -v psql &> /dev/null; then
    DEBIAN_FRONTEND=noninteractive apt-get update && \
      apt-get -y install lsb-release && \
      wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | apt-key add - && \
      echo "deb http://apt.postgresql.org/pub/repos/apt/ `lsb_release -cs`-pgdg main" | tee  /etc/apt/sources.list.d/pgdg.list && \
      apt-get update && \
      apt-get -y install postgresql-client-13
  fi

reset *args:
  just prisma migrate reset {{ args }}

run svc *args:
  #!/usr/bin/env bash
  set -euox pipefail
  case {{ svc }} in
    frontend)
      cd "{{ frontend_dir }}"
      GENERATE_SOURCEMAP=false PORT=3000 yarn dev
      ;;

    backend)
      cd "{{ backend_dir }}"
      PORT=3001 yarn start:dev
      ;;

    *)
      main="{{ justfile_directory() }}/src/go/apps/{{ svc }}/tmp/main"
      if [[ ! -d "{{ justfile_directory() }}/src/go/apps/{{ svc }}" ]]; then
        echo "Could not find the service {{ svc }}"
      else
        air \
          -build.include_dir="go" \
          -build.bin="$main" \
          -build.cmd="go build -o $main {{ justfile_directory() }}/src/go/apps/{{ svc }}" \
          "{{ args }}"
      fi
      ;;
      
  esac

setup-testdb:
  #!/usr/bin/env bash
  set -euox pipefail

  database_exists() {
    psql "{{ devdb_url }}" -tAc "SELECT 1 FROM pg_database WHERE datname='test'" | grep -q 1
  }

  # Terminate all existing connections if the database exists.
  if database_exists; then
    psql "{{ devdb_url }}" -c "REVOKE CONNECT ON DATABASE test FROM PUBLIC"
    psql "{{ devdb_url }}" -c "SELECT pg_terminate_backend(pg_stat_activity.pid)FROM pg_stat_activity WHERE pg_stat_activity.datname = 'test' AND pid <> pg_backend_pid()"
  else
    echo "Database 'test' does not exist, skipping termination of connections."
  fi

  psql "{{ devdb_url }}" -c "DROP DATABASE IF EXISTS test"
  psql "{{ devdb_url }}" -c "CREATE DATABASE test OWNER postgres"
  cd "{{ backend_dir }}"
  DATABASE_URL="{{ testdb_url }}" PRISMA_CLIENT_ENGINE_TYPE={{ prisma_engine }} yarn prisma migrate dev

test target *args:
  #!/usr/bin/env bash
  set -euox pipefail
  case "{{ target }}" in
    backend)
      echo "NodeJS:" $(node -v)
      echo "Prisma Engine:" {{ prisma_engine }}

      just setup-testdb
      cd "{{ backend_dir }}"
      DATABASE_URL="postgres://postgres:postgres@localhost:5432/test?pool_timeout=60" NODE_OPTIONS="--max_old_space_size=8192" PRISMA_CLIENT_ENGINE_TYPE={{ prisma_engine }} node --expose-gc ./node_modules/.bin/jest --runInBand --logHeapUsage --no-compilation-cache --silent=false {{ args }}
      ;;
  esac

test-e2e *args:
  #!/usr/bin/env bash
  set -euox pipefail
  echo "NodeJS:" $(node -v)
  echo "Prisma Engine:" {{ prisma_engine }}

  just setup-testdb
  cd "{{ backend_dir }}"
  DATABASE_URL="postgres://postgres:postgres@localhost:5432/test?pool_timeout=60" NODE_OPTIONS="--max_old_space_size=8192" PRISMA_CLIENT_ENGINE_TYPE={{ prisma_engine }} node --expose-gc ./node_modules/.bin/jest --config ./jest-e2e.json --runInBand --no-compilation-cache --forceExit {{ args }}
