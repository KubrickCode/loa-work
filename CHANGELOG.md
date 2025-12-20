# Changelog

## [0.6.0](https://github.com/KubrickCode/loa-work/compare/v0.5.0...v0.6.0) (2025-12-15)

### 🎯 Highlights

#### ✨ Features

- **go:** libs/ratelimit 모듈 추가 및 전체 scraper에 rate limiting 적용 ([a379535](https://github.com/KubrickCode/loa-work/commit/a379535be21368f01ca015b5a10383ac7f60110b))
- **ui:** 스켈레톤 로딩을 텍스트 로딩으로 교체 ([1362914](https://github.com/KubrickCode/loa-work/commit/136291488acaa7d8640a38960c13455bb548972a))
- **ui:** 프리미엄 모노크롬 테마 적용 및 라이트모드 gray 제거 ([d73039e](https://github.com/KubrickCode/loa-work/commit/d73039ef0c6c7f8054b135fda74637a18728640c))

#### 🐛 Bug Fixes

- **release:** breaking change 커밋이 major 버전으로 처리되지 않는 문제 수정 ([5d22d9f](https://github.com/KubrickCode/loa-work/commit/5d22d9f57a01087b694689315bae9df3fd0f29cf))

#### ⚡ Performance

- **e2e:** E2E 테스트 병렬 실행 활성화 ([9f3e616](https://github.com/KubrickCode/loa-work/commit/9f3e61661842e17b049debc83e38a6a5c2a58115))

### 🔧 Maintenance

#### 🔧 Internal Fixes

- generated 파일 생성 경로 수정 ([4fd7b20](https://github.com/KubrickCode/loa-work/commit/4fd7b2094707bd56cd4476267abe545dda6f32ef))
- **go:** RequestBuilder의 JSON 마샬링 에러가 무시되는 문제 수정 ([5744d57](https://github.com/KubrickCode/loa-work/commit/5744d577d9b87e3c9e2223dbc6f00cf6f688c638))

#### 📚 Documentation

- ai-config-toolkit 리포지토리로부터 문서 동기화 ([2a5c485](https://github.com/KubrickCode/loa-work/commit/2a5c48543eee24a1f8f25aef9de3279d1afd8263))
- 서브에이전트 지정 모델 제거 ([23e2ab2](https://github.com/KubrickCode/loa-work/commit/23e2ab2a4a0549bb93821bd1f5d0c9a07ae22005))

#### ♻️ Refactoring

- **frontend:** Content Dialog 섹션 컴포넌트 분리 및 N+1 쿼리 해결 ([2fcd4ff](https://github.com/KubrickCode/loa-work/commit/2fcd4ff4bd3a558704097a639384ca02e21a3311))
- **frontend:** Content 필터 컴포넌트 중복 제거 및 공통화 ([5ee574b](https://github.com/KubrickCode/loa-work/commit/5ee574b3adaffff892746a7f7a026a8ebb8217e1))
- **frontend:** DataTable 컴포넌트에서 테이블 로직을 커스텀 훅으로 분리 ([ef5bb56](https://github.com/KubrickCode/loa-work/commit/ef5bb5662a6a41282ba75fa6a7b9991f162492c4))
- **frontend:** FavoriteIcon 컴포넌트에서 로직을 커스텀 훅으로 분리 ([be3fc21](https://github.com/KubrickCode/loa-work/commit/be3fc219c034bbdcd9a97aacf996025e70365275))
- **frontend:** lodash를 es-toolkit으로 교체 ([2b3f51a](https://github.com/KubrickCode/loa-work/commit/2b3f51ab13a6d67ac452a8a9f661f0b8932d05b2))
- **frontend:** 불필요한 useEffect 제거 ([9944fe6](https://github.com/KubrickCode/loa-work/commit/9944fe618dc1949c6a454c802ca4843861f9f879))
- **frontend:** 프로젝트 스킬 가이드라인에 맞는 디렉토리 구조로 전면 재구성 ([17f5816](https://github.com/KubrickCode/loa-work/commit/17f58168a659b734d557013dcb95820b61d0717f))
- **go:** API 클라이언트 DI 패턴 적용 ([087f44b](https://github.com/KubrickCode/loa-work/commit/087f44b3435082aab0a4d16e0a7360b42efc6c69))
- **go:** schedule 모듈 내부를 gocron v2로 마이그레이션 ([1a5ed80](https://github.com/KubrickCode/loa-work/commit/1a5ed80d5ad5a39996e9dc7c7147da23a0a9fd31))
- **go:** slog 구조화 로깅 및 fmt.Errorf %w 에러 체인 적용 ([3d5531d](https://github.com/KubrickCode/loa-work/commit/3d5531d71d603b4e145a9733e63bb0c77f893921))
- 실제 데이터 기반 시드데이터 생성되도록 수정 ([28901da](https://github.com/KubrickCode/loa-work/commit/28901da10eacf9ae08b214f78ad4534d2c51941f))

#### ✅ Tests

- **e2e:** Playwright 인증 테스트 환경 구축 ([51aa9d9](https://github.com/KubrickCode/loa-work/commit/51aa9d974dbbd7260c81ced754f8afb9a7416e70))
- **e2e:** UI E2E 테스트 추가 ([aeeb289](https://github.com/KubrickCode/loa-work/commit/aeeb289dedc166259d85dc89e1882fc7eca7d3b0))
- **e2e:** UI E2E 테스트 추가 ([eeff150](https://github.com/KubrickCode/loa-work/commit/eeff15082ad435e8c1c0501a046a7356b0515ebe))
- **e2e:** UI E2E 테스트 추가 ([4386095](https://github.com/KubrickCode/loa-work/commit/43860955da8d745175f242d7cc62ecef28990f39))
- **go:** libs 테스트 커버리지 80% 이상 달성 ([7353266](https://github.com/KubrickCode/loa-work/commit/73532665915307313c666957084b5f7ac6791776))

#### 🔨 Chore

- lock 파일은 lint 명령에서 제외 ([831cba7](https://github.com/KubrickCode/loa-work/commit/831cba796995f6c96ec6b12b4b43c535979b986e))
- playwright mcp 브라우저 설정 ([83a32fa](https://github.com/KubrickCode/loa-work/commit/83a32fa0e945e5e232ca122de66614566ab73ca3))
- temp 파일 gitignore ([cbd6977](https://github.com/KubrickCode/loa-work/commit/cbd6977a571b3d6d9ddfc02592748d13b502b926))
- 빌드 아티팩트 gitignore에 추가 ([a19b680](https://github.com/KubrickCode/loa-work/commit/a19b680b5e6e3b2d1d7f09a116c8171c23611403))
- 액션 버튼 아이콘 수정 및 추가 ([7f8d2f2](https://github.com/KubrickCode/loa-work/commit/7f8d2f2f908e04b71d8b0c06f05ad49e3a6b8818))
- 액션 버튼 아이콘 추가 ([1cc995d](https://github.com/KubrickCode/loa-work/commit/1cc995df60205b3a26ed3a69b9e51793e35c3cd9))
- 웹 서버 실행 단축키 변경 ([45e65e5](https://github.com/KubrickCode/loa-work/commit/45e65e57bd8755af7bbf4d90b35da6bbecb769f2))

## [0.5.0](https://github.com/KubrickCode/loa-work/compare/v0.4.2...v0.5.0) (2025-12-01)

### 🎯 Highlights

#### ✨ Features

- **backend:** GraphQL InputType 자동 검증 인프라 구축 ([f6414e7](https://github.com/KubrickCode/loa-work/commit/f6414e787f6066d3b850d1fc6a9c55e3b94e6b21))

#### 🐛 Bug Fixes

- **frontend:** Form.Checkbox 클릭해도 상태가 변경되지 않는 문제 수정 ([cb1f4b9](https://github.com/KubrickCode/loa-work/commit/cb1f4b98c925e8c440819b3ac4c983e276068df2))
- **frontend:** 모달에서 드래그 후 테이블 행 클릭이 발생하는 문제 수정 ([2c23a88](https://github.com/KubrickCode/loa-work/commit/2c23a88361ffbba9f01a78371f3f300c73584cf0))
- **frontend:** 카테고리 필터링 후 소요시간 수정 모달이 이전 컨텐츠로 열리는 문제 수정 ([6e1eff5](https://github.com/KubrickCode/loa-work/commit/6e1eff5736b63323592666215048b9a0e73fad3b))

### 🔧 Maintenance

#### ♻️ Refactoring

- **backend:** CommonModule에서 PrismaService 분리 ([f3efa1e](https://github.com/KubrickCode/loa-work/commit/f3efa1e4f9d190c7453aaf0929f1b86166041836))
- **backend:** contentList query에 정렬 기능 추가 ([92d6a6f](https://github.com/KubrickCode/loa-work/commit/92d6a6f5621c40c51e8693bc07e35036ffeab1d5))
- **backend:** DataLoader 타입 안전성 개선 및 구조 분리 ([fab33a4](https://github.com/KubrickCode/loa-work/commit/fab33a463bc9bbbd14dfe40ba2c9be7706342af6))
- **backend:** es-toolkit 기반으로 유틸성 함수 개선 ([35c88c7](https://github.com/KubrickCode/loa-work/commit/35c88c73fcce2b0f7b8b687141ca01caf010f51d))
- **backend:** Mutation 응답 타입 표준화 ([1de97cd](https://github.com/KubrickCode/loa-work/commit/1de97cd837b3135613ee06596f823d08f16f59c7))
- **backend:** Service 계층의 GraphQL Context 의존성 제거 ([ae25261](https://github.com/KubrickCode/loa-work/commit/ae25261b2ec4085560afb8c2481170c6fbd5aae0))
- **backend:** 모듈 구조 개선 및 Service Layer 분리 ([7bfc621](https://github.com/KubrickCode/loa-work/commit/7bfc621eb5526e70593ee24c7bda593b91480ee1))
- **backend:** 서비스 계층 코드 중복 제거 및 구조 개선 ([fad9324](https://github.com/KubrickCode/loa-work/commit/fad9324743cd58203fcb6435e15314e042d1020e))
- **backend:** 에러를 삼키는 핸들링 패턴 수정 ([53b0d6a](https://github.com/KubrickCode/loa-work/commit/53b0d6a675514b82eb265a807c68f9199c69c253))
- **graphql:** InputType 네이밍 규칙 표준화 및 Boolean 필드명 개선 ([181f3ee](https://github.com/KubrickCode/loa-work/commit/181f3eef529896eb134e9ecd684ee9867aa5c5b7))

#### 🔨 Chore

- test 명령어 통합 ([4e9e73a](https://github.com/KubrickCode/loa-work/commit/4e9e73abc7ec569d1c8e069d5b46b6a6ada72d99))
- 불필요한 명령어 제거 ([7792453](https://github.com/KubrickCode/loa-work/commit/77924531eb13d61614f54b5cbe276de5e1def386))
- 유용한 액션 버튼 커맨드 추가 ([eb83e42](https://github.com/KubrickCode/loa-work/commit/eb83e426b8b8c39fc50ffe370d34985a926992e0))

## [0.4.3](https://github.com/KubrickCode/loa-work/compare/v0.4.2...v0.4.3) (2025-11-20)

### 🎯 Highlights

#### ✨ Features

- **backend:** 전역 에러 처리 인프라 구축 ([d63f1a1](https://github.com/KubrickCode/loa-work/commit/d63f1a12469e75e86f704a5df10043a8d3af91bb))

### 🔧 Maintenance

#### 📚 Documentation

- ai-config-toolkit 리포지토리로부터 ai 문서 동기화 ([5d809c1](https://github.com/KubrickCode/loa-work/commit/5d809c1bcb7e7cb0ea7942394de5bda81182059b))
- ai-config-toolkit 리포지토리로부터 문서 동기화 ([94f40dc](https://github.com/KubrickCode/loa-work/commit/94f40dc40df891060afe3f480b19820ea5f5233b))
- ai-config-toolkit 리포지토리로부터 문서 동기화 ([91d6ed7](https://github.com/KubrickCode/loa-work/commit/91d6ed7b065a9458fd9b990a94f5a65f95f4355f))

#### ♻️ Refactoring

- workflow-toolkit 레포지토리의 reusable workflow 사용으로 전환 ([3ffa57b](https://github.com/KubrickCode/loa-work/commit/3ffa57b211716c25959488eb67963805b7be947c))

#### ✅ Tests

- Playwright 기반 E2E UI 테스트 인프라 구축 ([1b9249f](https://github.com/KubrickCode/loa-work/commit/1b9249f816fa65cb666b517f1ed83f58785df2c5))

#### 🔨 Chore

- ai-config-toolkit 리포지토리로부터 문서 동기화 ([e8a901e](https://github.com/KubrickCode/loa-work/commit/e8a901ecf63f0510b2fb52c48f23e23f96fb4971))
- devcontainer node feature에 pnpm setup 추가 ([3e3cf93](https://github.com/KubrickCode/loa-work/commit/3e3cf93d9f8ef3bf6188945dce8109c92ac0730b))
- docker-in-docker feature 제거 ([d36ceb5](https://github.com/KubrickCode/loa-work/commit/d36ceb52f1c00d0741a0834162817b89fcb1db4d))
- gitignore 단순화 ([ea2f1b4](https://github.com/KubrickCode/loa-work/commit/ea2f1b4e3b50085d327742b5753f4870c37a7200))
- just 설치 단순화 ([6627768](https://github.com/KubrickCode/loa-work/commit/6627768beae8231fdbd1819fcd5e6fe31b33d28c))
- release 명령어 실행 시 사용자 confirm 받도록 수정 ([ea246a3](https://github.com/KubrickCode/loa-work/commit/ea246a32d077f120cd4d06f323aa854bad078627))
- semantic-release 설정을 JS 형식으로 마이그레이션 ([98af2f7](https://github.com/KubrickCode/loa-work/commit/98af2f7e28412d84c266f3263020439e4e1c6622))
- 깃허브 CLI 컨테이너 기본 설정에 추가 ([a2b6dc5](https://github.com/KubrickCode/loa-work/commit/a2b6dc51e776d3c0740e8e7011914596e9e691c2))

## [0.4.2](https://github.com/KubrickCode/loa-work/compare/v0.4.1...v0.4.2) (2025-11-16)

### 🔧 Maintenance

#### 📚 Documentation

- CLAUDE.md 불필요한 내용 제거 ([172d8e2](https://github.com/KubrickCode/loa-work/commit/172d8e247c234c93cf2f5d437f2eafdb573c9d90))
- 커밋 메시지 생성기에 ifix 타입 추가 및 구분 가이드 개선 ([169170a](https://github.com/KubrickCode/loa-work/commit/169170a228fe1289dfcfd268dee728feb9814e8b))

#### 🔨 Chore

- lint 실행 시 generated.tsx 파일 자동 변경 문제 해결 ([272c1d7](https://github.com/KubrickCode/loa-work/commit/272c1d76a612dfd7968758355c326f2bbf9b34fd))
- 개발자 관점 수정 커밋용 ifix 규칙 release 워크플로우에 적용 ([4689ca1](https://github.com/KubrickCode/loa-work/commit/4689ca18629a87e2db1d4f8ade7feb6039a14953))

## [0.4.1](https://github.com/KubrickCode/loa-work/compare/v0.4.0...v0.4.1) (2025-11-16)

### 🔧 Maintenance

#### 🔨 Chore

- semantic-release 완전 자동화 설정 ([144e513](https://github.com/KubrickCode/loa-work/commit/144e5130d61d19b3b7969d474b4f8ad8312caac5))

## [0.4.0](https://github.com/KubrickCode/loa-work/compare/v0.3.4...v0.4.0) (2025-11-16)

### 🎯 Highlights

#### ✨ Features

- 차트 기능 제거 ([ae4cb63](https://github.com/KubrickCode/loa-work/commit/ae4cb636d9735cd109b46e9ced59f553f94e8704))

### 🔧 Maintenance

#### 📚 Documentation

- AI 관련 문서 및 설정 교체 ([4354b73](https://github.com/KubrickCode/loa-work/commit/4354b73ffbe1a1e693dfd41ea3897052e6bc592b))
- ai-config-toolkit 리포지토리로부터 코드 동기화 ([ef1e6e0](https://github.com/KubrickCode/loa-work/commit/ef1e6e0f263b435242eecc85135e1070811e27cd))
- ai-config-toolkit 리포지토리로부터 프롬프트 동기화 ([28d6ef9](https://github.com/KubrickCode/loa-work/commit/28d6ef98ba78faeca435a1b4ee989eecbc952cbf))
- CLAUDE.md 업데이트 ([aab1d7f](https://github.com/KubrickCode/loa-work/commit/aab1d7f5382a8ea6ddc0fccac474197ff115bd7f))
- 명령어 실행 원칙 CLAUDE.md에 추가 ([25ca6f0](https://github.com/KubrickCode/loa-work/commit/25ca6f05aae32a7da30c899adf93b6aa6f888ce8))
- 의존성 버전 고정 및 관련 원칙 CLAUDE 스킬 추가 ([7148add](https://github.com/KubrickCode/loa-work/commit/7148addec8473c1b1e7e39114ff793f1920ab472))
- 커밋 명령어에 Conventional Commits 규격 추가 ([4bc294a](https://github.com/KubrickCode/loa-work/commit/4bc294a3e51e5cf210450ed91b3b7cdc50d82878))

#### 💄 Styles

- format code ([338ad5b](https://github.com/KubrickCode/loa-work/commit/338ad5bcfcbdada9e98352c540fdeeb0ad50fde6))
- 깨진 문서 포맷 수정 ([748bf33](https://github.com/KubrickCode/loa-work/commit/748bf33e495fad45295f53dd9107e411666bbe29))

#### 🔧 CI/CD

- GitHub Actions 워크플로우를 semantic-release 자동화로 전환 ([ce2867c](https://github.com/KubrickCode/loa-work/commit/ce2867c64531a9bddadbdaecaa55b388252cff37))

#### 🔨 Chore

- Claude Code 터미널명 업데이트 ([c8e446f](https://github.com/KubrickCode/loa-work/commit/c8e446f1cb54c468f8fe2c02cf88c9da135400fc))
- Debian trixie의 moby-cli 미지원으로 인한 docker-in-docker 빌드 실패 문제 수정 ([c1c39a7](https://github.com/KubrickCode/loa-work/commit/c1c39a755420fc69ad0c1890efd1e410b540b0a0))
- dependabot 커밋 메시지 규칙 변경 ([6003625](https://github.com/KubrickCode/loa-work/commit/6003625288666de3a162cfc01b133c4ba9c1f894))
- **deps:** Bump vite in /src/backend ([d9370f2](https://github.com/KubrickCode/loa-work/commit/d9370f2036e3ddd94cbcce0ca902d3236a32e2e0))
- DevContainer rebuild 시 Claude Code 재로그인 문제 해결 ([1379437](https://github.com/KubrickCode/loa-work/commit/13794376d560dc3293016667c72e6c7396df7bcc))
- Docker 빌드 컨텍스트 경로 오류로 인한 배포 실패 ([f95902e](https://github.com/KubrickCode/loa-work/commit/f95902e7442ca93ca2628eaeb314933e89fa78e7))
- frontend lint 명령어 fix 추가 ([8624c23](https://github.com/KubrickCode/loa-work/commit/8624c23cd5de102ed18c7145207a5a5fbcbf0b6e))
- generated.tsx 파일이 husky lint-staged 스킵하도록 수정 ([7a19a8d](https://github.com/KubrickCode/loa-work/commit/7a19a8d3e26241ed669ed6a7a7f67e5bad2fcce3))
- git 액션 버튼 터미널명 설정 ([84e83b1](https://github.com/KubrickCode/loa-work/commit/84e83b133fc33a4198f5a16978684303a2906157))
- GitHub Actions에서 semantic-release 커밋 시 husky 비활성화 ([f524083](https://github.com/KubrickCode/loa-work/commit/f524083dca50cb013878728c928ca9dedd249bd3))
- gitignore 업데이트 ([de2127b](https://github.com/KubrickCode/loa-work/commit/de2127b7c624d92826d66a50e879a943cffc8a00))
- PR 작성자가 자신을 검토자로 추가하려고 할 때 발생하는 오류 수정 ([122edbe](https://github.com/KubrickCode/loa-work/commit/122edbe30c80c4b29e17a04ae4b4485b9f45c615))
- runtime 이미지에서 Prisma 클라이언트 생성 누락 문제 해결 ([10575d9](https://github.com/KubrickCode/loa-work/commit/10575d9a8903fc507f08e0ff7d8bcdf96cbed304))
- semantic-release 의존성 및 설정 추가 ([61769ba](https://github.com/KubrickCode/loa-work/commit/61769ba9a243095aa0e093cd76f1025693e866ac))
- semantic-release 자동화를 위한 릴리즈 프로세스 변경 ([0b8c773](https://github.com/KubrickCode/loa-work/commit/0b8c77357138b3e670b1c74766b2cf9cbafbd2d7))
- 글로벌 환경변수 설정 ([9282297](https://github.com/KubrickCode/loa-work/commit/92822979d06bf5ea17950371bd302c44e7f3d194))
- 기존 릴리즈 히스토리를 CHANGELOG.md에 추가 ([7cb4900](https://github.com/KubrickCode/loa-work/commit/7cb49004132d071a122d850ee3a6020b2931447f))
- 누락된 codegen 적용 ([7bfb370](https://github.com/KubrickCode/loa-work/commit/7bfb37067c85864b2d510f7b458c3e06025cbe15))
- 누락된 의존성 추가 ([bf85562](https://github.com/KubrickCode/loa-work/commit/bf8556278c54da5d8d52091d46f5bc51e0e68833))
- 디스코드 웹훅 URL 환경변수명 변경 ([9afd41d](https://github.com/KubrickCode/loa-work/commit/9afd41d9ed44da2cf278ba8e7d904c17ad4ff520))
- 워크플로우 전용 문서는 git에 업로드되지 않도록 수정 ([334607b](https://github.com/KubrickCode/loa-work/commit/334607b338f5b64fbbfadfa8352f10201bfca3e6))
- 워크플로우 커맨드 이중 언어 문서 생성 기능 추가 ([10f20db](https://github.com/KubrickCode/loa-work/commit/10f20db054be81136f7d56bf8b4373f7818f70ef))
- 자주 사용하는 MCP 서버 추가 ([e8382c0](https://github.com/KubrickCode/loa-work/commit/e8382c00c97f72714878d8354ac9ea4f021632f5))
- 잘못된 형식의 문서 제거 ([c59429b](https://github.com/KubrickCode/loa-work/commit/c59429bbebd4f3d64882531fba8747c73cf02259))
- 저장 시와 lint 실행 시 포맷팅이 달라지는 문제 해결 ([563316e](https://github.com/KubrickCode/loa-work/commit/563316e9bb5435a4a7b6ed7925066c63cc2e2d57))
- 커밋 전 린트 오류 발견이 늦어 재작업이 발생하는 문제 개선 ([8b626bf](https://github.com/KubrickCode/loa-work/commit/8b626bfeb6530d53a25863f3114518b5eaab1e78))
- 패키지 매니저를 yarn에서 pnpm으로 마이그레이션 ([c596e11](https://github.com/KubrickCode/loa-work/commit/c596e11daf1b7f4e70d8d89a93a5415140c86011))

## [0.3.4](https://github.com/KubrickCode/loa-work/compare/v0.3.3...v0.3.4) (2025-10-17)

### 🔧 Maintenance

#### 🔨 Chore

- 테이블 스켈레톤 모바일 반응형 개선
- 아이템 시세 페이지 > 거래소 아이템 탭 판매 단위 폰트가 너무 큰 문제 수정

## [0.3.3](https://github.com/KubrickCode/loa-work/compare/v0.3.2...v0.3.3) (2025-10-16)

### 🎯 Highlights

#### 🐛 Bug Fixes

- 로그인 다이얼로그가 예상치 못한 동작과 함께 열리는 문제 수정

### 🔧 Maintenance

#### 🔨 Chore

- Bump actions/setup-node from 5 to 6

## [0.3.2](https://github.com/KubrickCode/loa-work/compare/v0.3.1...v0.3.2) (2025-10-14)

### 🎯 Highlights

#### 🐛 Bug Fixes

- 화면이 작아지면 아이템 시세 페이지 테이블 내 섹션이 상위 섹션을 넘어가는 문제 수정

### 🔧 Maintenance

#### ♻️ Refactoring

- ESLint 9 업그레이드 및 코드 정렬 규칙 강화로 코드 품질 표준화
- Prettier 기반 코드 포매팅 표준화 및 전체 코드베이스 적용

#### 🔨 Chore

- hotfix: Revert to node 22.11.0 and fix OOM issues
- Fix SplitLayout responsive layout overflow (767px-1450px)
- Change Discord notification language
- Modify the environment variables in the env file so that they can be used in the shell environment as well
- Removing webhook tokens
- Bump actions/setup-go from 5 to 6
- init CLAUDE.md
- CLAUDE.md gitignore 에서 제외
- node 버전 수정
- 이슈,pr 워크플로우 수정
- format code
- edit justfile lint
- sync ai agent configurations from general
- sync container configurations from general
- Bump softprops/action-gh-release from 1 to 2
- 설정 파일 포매팅 지원 추가 및 devcontainer 구조 개선
- go 코드포맷 추가
- 컨테이너 claude code 기본 설치

## [0.3.1](https://github.com/KubrickCode/loa-work/compare/v0.3.0...v0.3.1) (2025-10-06)

### 🔧 Maintenance

#### 🔨 Chore

- 깃허브 릴리즈 워크플로우 추가
- 깃허브 후원 버튼 추가

## [0.3.0](https://github.com/KubrickCode/loa-work/compare/v0.2.9...v0.3.0) (2025-10-06)

### 🎯 Highlights

#### ✨ Features

- 사이트 디자인 시스템 전면 교체

### 🔧 Maintenance

#### 🔨 Chore

- AI Agent 관련 설정 추가

## [0.2.9](https://github.com/KubrickCode/loa-work/compare/v0.2.8...v0.2.9) (2025-10-06)

### 🔧 Maintenance

#### ✅ Tests

- 테스트 케이스 추가

#### ♻️ Refactoring

- gorm -> SQLBoiler 로 go 코드 orm 교체 (변경으로 인해 스키마 작성 시 prisma, go 양 측에 중복 코드 작성하지 않아도 됨)

## [0.2.8](https://github.com/KubrickCode/loa-work/compare/v0.2.7...v0.2.8) (2025-10-06)

### 🎯 Highlights

#### ✨ Features

- 푸터 디자인 개선
- 푸터 항상 보이도록 개선

#### 🐛 Bug Fixes

- 테이블 셀 내용이 길 때 내용이 셀을 넘어가는 문제 수정
- 페이지 새로고침 시 푸터 배경이 사라지는 문제 수정

## [0.2.7](https://github.com/KubrickCode/loa-work/compare/v0.2.6...v0.2.7) (2025-10-06)

### 🎯 Highlights

#### ✨ Features

- 후원 안내 팝오버 추가

## [0.2.6](https://github.com/KubrickCode/loa-work/compare/v0.2.5...v0.2.6) (2025-10-06)

### 🎯 Highlights

#### ✨ Features

- 구글 검색 노출 개선

## [0.2.5](https://github.com/KubrickCode/loa-work/compare/v0.2.4...v0.2.5) (2025-10-06)

### 🎯 Highlights

#### ✨ Features

- 컨텐츠 아카이브 기능 추가 및 UI에서 숨김처리
- 귀속 골드 추가
- 모든 아이템에 대해 컨텐츠 보상 수정 가능하도록 개선

## [0.2.4](https://github.com/KubrickCode/loa-work/compare/v0.2.3...v0.2.4) (2025-10-06)

### 🎯 Highlights

#### ✨ Features

- 시급 페이지 각 컨텐츠 즐겨찾기 기능 추가

## [0.2.3](https://github.com/KubrickCode/loa-work/compare/v0.2.2...v0.2.3) (2025-10-06)

### 🎯 Highlights

#### ✨ Features

- 서버 골드 환율 변경 시 디스코드 알림 기능 추가

## [0.2.2](https://github.com/KubrickCode/loa-work/compare/v0.2.1...v0.2.2) (2025-10-06)

### 🎯 Highlights

#### ✨ Features

- 시급 페이지 관문 합쳐보기 기능 추가

## [0.2.1](https://github.com/KubrickCode/loa-work/compare/v0.2.0...v0.2.1) (2025-10-06)

### 🎯 Highlights

#### ✨ Features

- 테이블 행 클릭 지원(모달 open, 링크 이동 등)
- 컨텐츠 상세 모달 추가
- Not Found 페이지 추가
- 숫자 입력칸 화살표 클릭으로 쉽게 조정 가능하도록 개선

## [0.2.0](https://github.com/KubrickCode/loa-work/compare/v0.1.4...v0.2.0) (2025-10-06)

### 🎯 Highlights

#### ✨ Features

- 데이터로더 도입 및 성능 개선
- 사용자 안내 툴팁 곳곳에 추가
- 소요시간 분, 초 단위로 수정 가능하도록 개선
- 시급 페이지에 현재 골드 환율 표시

#### 🐛 Bug Fixes

- 모바일에서 검색 엔터 버튼이 보이지 않는 문제 수정

### 🔧 Maintenance

#### 📚 Documentation

- README 작성

#### ♻️ Refactoring

- 합성 컴포넌트 패턴 도입
- 린트 규칙 추가

#### ✅ Tests

- 대부분 케이스 유닛테스트 추가
- E2E 테스트 추가

#### 🔨 Chore

- grafana, prometheus, loki, promtail 기반 모니터링 서버 구축

## [0.1.4](https://github.com/KubrickCode/loa-work/compare/v0.1.3...v0.1.4) (2025-10-06)

### 🎯 Highlights

#### ✨ Features

- 소유자가 컨텐츠 소요시간 수정 시 서버 데이터가 수정되도록 수정

## [0.1.3](https://github.com/KubrickCode/loa-work/compare/v0.1.2...v0.1.3) (2025-10-06)

### 🎯 Highlights

#### ✨ Features

- 모달 내 본문 내에서 스크롤 되도록 개선

### 🔧 Maintenance

#### ✅ Tests

- go test 환경 구축

## [0.1.2](https://github.com/KubrickCode/loa-work/compare/v0.1.1...v0.1.2) (2025-10-06)

### 🎯 Highlights

#### ✨ Features

- 유저 컨텐츠 보상 제보 기능 추가
- 어드민 페이지 추가 (컨텐츠 생성, 보상 검증, 보상 예측 기능)
- 테이블 헤더 고정 기능 추가
- 테이블 내 검색 필터 추가
- 테이블 striped 스타일 제거
- 설명서 아코디언 디자인으로 개선
- 설명서 내용 보충

### 🔧 Maintenance

#### 🔨 Chore

- 로그로켓 및 sentry 세팅

## [0.1.1](https://github.com/KubrickCode/loa-work/compare/v0.1.0...v0.1.1) (2025-10-06)

### 🎯 Highlights

#### ✨ Features

- 유물각인서 테이블 최저가 내림차순 정렬
- 보석 테이블 구매가 내림차순 정렬
- 전반적으로 반응형 레이아웃 개선
- 설명서 내용 작성

### 🔧 Maintenance

#### ♻️ Refactoring

- 테이블 내 모든 칼럼 선택적으로 정렬 가능하도록 수정

## [0.1.0](https://github.com/KubrickCode/loa-work/compare/v0.0.23...v0.1.0) (2025-10-06)

### 🎯 Highlights

#### ✨ Features

- AWS EC2, ECR 기반 웹 서비스, 수집 서비스 배포, 도메인 설정
- 마지막 아이템 시세 업데이트 일시 표시
- 시급 테이블 컨텐츠 레벨 정렬 기능 추가
- 시급, 보상 페이지 차트 추가 및 표, 차트 탭 분리
- 사이트 타이틀 추가 -> 프로젝트명을 로아장으로 결정
- 파비콘 추가
- 시급 페이지 1수당 골드 추가
- 푸터 추가
- 컨텐츠 시급 계산기 추가
- 서비스 이용 설명서 추가
- 귀속 재료 표시 아이콘으로 변경
- 각 섹션 제목 표시

#### 🐛 Bug Fixes

- 정렬 버튼 색상이 다크모드가 고려되지 않은 문제 수정

#### ⚡ Performance

- 가격 통계 데이터 조회 성능 개선

### 🔧 Maintenance

#### ♻️ Refactoring

- 린트 규칙 추가
- 테스트 워크플로우 구조 개선

## [0.0.23](https://github.com/KubrickCode/loa-work/compare/v0.0.22...v0.0.23) (2025-10-06)

### 🎯 Highlights

#### ✨ Features

- 각종 아이템, 컨텐츠 카테고리 등 이미지 칼럼 추가
- 시급페이지 컨텐츠 레벨 추가

## [0.0.22](https://github.com/KubrickCode/loa-work/compare/v0.0.21...v0.0.22) (2025-10-06)

### 🎯 Highlights

#### ✨ Features

- 아이템 시세 페이지 분할 레이아웃 디자인 적용
- 아이템 시세 페이지 각종 가격 정렬 기능 추가

## [0.0.21](https://github.com/KubrickCode/loa-work/compare/v0.0.20...v0.0.21) (2025-10-06)

### 🎯 Highlights

#### ✨ Features

- 아이템 시세 페이지 재련 추가 재료 추가
- 아이템 시세 페이지 유물각인서 추가

## [0.0.20](https://github.com/KubrickCode/loa-work/compare/v0.0.19...v0.0.20) (2025-10-06)

### 🎯 Highlights

#### ✨ Features

- 아이템 시세 페이지에 기타 아이템 추가
- 기타 아이템(실링, 카드경험치) 골드 가치 수정 기능 추가

## [0.0.19](https://github.com/KubrickCode/loa-work/compare/v0.0.18...v0.0.19) (2025-10-06)

### 🔧 Maintenance

#### ✅ Tests

- 테스트 코드 추가 및 강화

## [0.0.18](https://github.com/KubrickCode/loa-work/compare/v0.0.17...v0.0.18) (2025-10-06)

### 🎯 Highlights

#### ✨ Features

- 카카오 로그인 추가

## [0.0.17](https://github.com/KubrickCode/loa-work/compare/v0.0.16...v0.0.17) (2025-10-06)

### 🎯 Highlights

#### ✨ Features

- 유저별 컨텐츠 소요시간 커스터마이징 기능 추가
- 유저별 골드 환율 커스터마이징 기능 추가

## [0.0.16](https://github.com/KubrickCode/loa-work/compare/v0.0.15...v0.0.16) (2025-10-06)

### 🎯 Highlights

#### ✨ Features

- 컨텐츠별 보상 모달에서 수정가능하도록 개선
- 데이터 변경 성공 시 기본적으로 토스트 메시지 표시되도록 개선
- 골드 및 가격 표시 포맷 개선

## [0.0.15](https://github.com/KubrickCode/loa-work/compare/v0.0.14...v0.0.15) (2025-10-06)

### 🎯 Highlights

#### ✨ Features

- 컨텐츠 보상 유저별 커스터마이징 기능 추가

## [0.0.14](https://github.com/KubrickCode/loa-work/compare/v0.0.13...v0.0.14) (2025-10-06)

### 🎯 Highlights

#### ✨ Features

- 소셜 로그인 기능 추가

## [0.0.13](https://github.com/KubrickCode/loa-work/compare/v0.0.12...v0.0.13) (2025-10-06)

### 🎯 Highlights

#### ✨ Features

- 아이템 시세 페이지 추가

## [0.0.12](https://github.com/KubrickCode/loa-work/compare/v0.0.11...v0.0.12) (2025-10-06)

### 🎯 Highlights

#### ✨ Features

- 전반적인 여백, 레이아웃 변경
- 각 테이블에 조회용 각종 편의 필터 추가
- 테이블 디자인 개선
- 로딩 처리 UI/UX 개선

## [0.0.11](https://github.com/KubrickCode/loa-work/compare/v0.0.10...v0.0.11) (2025-10-06)

### 🔧 Maintenance

#### ✅ Tests

- 테스트 환경 및 테스트 코드 추가

## [0.0.10](https://github.com/KubrickCode/loa-work/compare/v0.0.9...v0.0.10) (2025-10-06)

### 🎯 Highlights

#### ✨ Features

- 대시보드에 컨텐츠별 시급 표시

## [0.0.9](https://github.com/KubrickCode/loa-work/compare/v0.0.8...v0.0.9) (2025-10-06)

### 🎯 Highlights

#### ✨ Features

- 웹 페이지 기본 레이아웃 구축 (페이지 라우터, 헤더, 네비게이션)
- 기본 페이지 생성 (대시보드, 컨텐츠 보상 페이지)
- 다크모드 추가

## [0.0.8](https://github.com/KubrickCode/loa-work/compare/v0.0.7...v0.0.8) (2025-10-06)

### 🔧 Maintenance

#### ♻️ Refactoring

- 컨텐츠, 컨텐츠 보상 기능을 위한 기본 구조 구축

## [0.0.7](https://github.com/KubrickCode/loa-work/compare/v0.0.6...v0.0.7) (2025-10-06)

### 🎯 Highlights

#### ✨ Features

- 경매장 아이템 가격 통계 수집 서비스 추가

## [0.0.6](https://github.com/KubrickCode/loa-work/compare/v0.0.5...v0.0.6) (2025-10-06)

### 🎯 Highlights

#### ✨ Features

- 거래소 아이템 가격 통계 데이터 수집 서비스 추가

## [0.0.5](https://github.com/KubrickCode/loa-work/compare/v0.0.4...v0.0.5) (2025-10-06)

### 🎯 Highlights

#### ✨ Features

- 거래소 아이템 수집 기능 추가

## [0.0.4](https://github.com/KubrickCode/loa-work/compare/v0.0.3...v0.0.4) (2025-10-06)

### 🔧 Maintenance

#### ✅ Tests

- 테스트 코드 및 테스트 워크플로우 추가

## [0.0.3](https://github.com/KubrickCode/loa-work/compare/v0.0.2...v0.0.3) (2025-10-06)

### 🎯 Highlights

#### ✨ Features

- 거래소 아이템 카테고리 수집 서비스 구현

## [0.0.2](https://github.com/KubrickCode/loa-work/compare/v0.0.1...v0.0.2) (2025-10-06)

### 🔧 Maintenance

#### ♻️ Refactoring

- 수집 서비스 구축용 go 인프라 및 orm 설정

## [0.0.1](https://github.com/KubrickCode/loa-work/releases/tag/v0.0.1) (2025-10-06)

### 🔧 Maintenance

#### 🔨 Chore

- 기본 프로젝트 구조 설정 및 개발 환경 구축
