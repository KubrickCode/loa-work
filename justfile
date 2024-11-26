set dotenv-load

root_dir := justfile_directory()
frontend_dir := root_dir + "/src/frontend"
backend_dir := root_dir + "/src/backend"

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

go-test:
  go list -f '{{{{.Dir}}' -m | xargs -I {} go test {}/...

makemigration name:
  just prisma migrate dev --create-only --name {{ name }}

migrate:
  just prisma migrate dev

migrate-prod:
  just prisma migrate deploy

prisma *args:
  #!/usr/bin/env bash
  set -euox pipefail
  cd "{{ backend_dir }}"
  yarn prisma {{ args }}

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
