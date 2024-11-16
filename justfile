set dotenv-load

root_dir := justfile_directory()
frontend_dir := root_dir + "/src/frontend"
backend_dir := root_dir + "/src/backend"

deps: deps-frontend deps-backend

deps-frontend:
  cd "{{ frontend_dir }}" && yarn install

deps-backend:
  cd "{{ backend_dir }}" && yarn install

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
