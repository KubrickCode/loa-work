## [0.4.0](https://github.com/KubrickCode/loa-work/compare/v0.3.4...v0.4.0) (2025-11-16)

### ✨ Features

* 차트 기능 제거 ([ae4cb63](https://github.com/KubrickCode/loa-work/commit/ae4cb636d9735cd109b46e9ced59f553f94e8704)), closes [#170](https://github.com/KubrickCode/loa-work/issues/170)

### 📚 Documentation

* AI 관련 문서 및 설정 교체 ([4354b73](https://github.com/KubrickCode/loa-work/commit/4354b73ffbe1a1e693dfd41ea3897052e6bc592b))
* ai-config-toolkit 리포지토리로부터 코드 동기화 ([ef1e6e0](https://github.com/KubrickCode/loa-work/commit/ef1e6e0f263b435242eecc85135e1070811e27cd))
* ai-config-toolkit 리포지토리로부터 프롬프트 동기화 ([28d6ef9](https://github.com/KubrickCode/loa-work/commit/28d6ef98ba78faeca435a1b4ee989eecbc952cbf))
* CLAUDE.md 업데이트 ([aab1d7f](https://github.com/KubrickCode/loa-work/commit/aab1d7f5382a8ea6ddc0fccac474197ff115bd7f))
* 명령어 실행 원칙 CLAUDE.md에 추가 ([25ca6f0](https://github.com/KubrickCode/loa-work/commit/25ca6f05aae32a7da30c899adf93b6aa6f888ce8))
* 의존성 버전 고정 및 관련 원칙 CLAUDE 스킬 추가 ([7148add](https://github.com/KubrickCode/loa-work/commit/7148addec8473c1b1e7e39114ff793f1920ab472))
* 커밋 명령어에 Conventional Commits 규격 추가 ([4bc294a](https://github.com/KubrickCode/loa-work/commit/4bc294a3e51e5cf210450ed91b3b7cdc50d82878))

### 💄 Styles

* format code ([338ad5b](https://github.com/KubrickCode/loa-work/commit/338ad5bcfcbdada9e98352c540fdeeb0ad50fde6))
* 깨진 문서 포맷 수정 ([748bf33](https://github.com/KubrickCode/loa-work/commit/748bf33e495fad45295f53dd9107e411666bbe29))

### 🔧 CI/CD

* GitHub Actions 워크플로우를 semantic-release 자동화로 전환 ([ce2867c](https://github.com/KubrickCode/loa-work/commit/ce2867c64531a9bddadbdaecaa55b388252cff37))

### 🔨 Chore

* Claude Code 터미널명 업데이트 ([c8e446f](https://github.com/KubrickCode/loa-work/commit/c8e446f1cb54c468f8fe2c02cf88c9da135400fc))
* Debian trixie의 moby-cli 미지원으로 인한 docker-in-docker 빌드 실패 문제 수정 ([c1c39a7](https://github.com/KubrickCode/loa-work/commit/c1c39a755420fc69ad0c1890efd1e410b540b0a0))
* dependabot 커밋 메시지 규칙 변경 ([6003625](https://github.com/KubrickCode/loa-work/commit/6003625288666de3a162cfc01b133c4ba9c1f894))
* **deps:** Bump vite in /src/backend ([d9370f2](https://github.com/KubrickCode/loa-work/commit/d9370f2036e3ddd94cbcce0ca902d3236a32e2e0))
* DevContainer rebuild 시 Claude Code 재로그인 문제 해결 ([1379437](https://github.com/KubrickCode/loa-work/commit/13794376d560dc3293016667c72e6c7396df7bcc))
* Docker 빌드 컨텍스트 경로 오류로 인한 배포 실패 ([f95902e](https://github.com/KubrickCode/loa-work/commit/f95902e7442ca93ca2628eaeb314933e89fa78e7))
* frontend lint 명령어 fix 추가 ([8624c23](https://github.com/KubrickCode/loa-work/commit/8624c23cd5de102ed18c7145207a5a5fbcbf0b6e))
* generated.tsx 파일이 husky lint-staged 스킵하도록 수정 ([7a19a8d](https://github.com/KubrickCode/loa-work/commit/7a19a8d3e26241ed669ed6a7a7f67e5bad2fcce3))
* git 액션 버튼 터미널명 설정 ([84e83b1](https://github.com/KubrickCode/loa-work/commit/84e83b133fc33a4198f5a16978684303a2906157))
* GitHub Actions에서 semantic-release 커밋 시 husky 비활성화 ([f524083](https://github.com/KubrickCode/loa-work/commit/f524083dca50cb013878728c928ca9dedd249bd3))
* gitignore 업데이트 ([de2127b](https://github.com/KubrickCode/loa-work/commit/de2127b7c624d92826d66a50e879a943cffc8a00))
* PR 작성자가 자신을 검토자로 추가하려고 할 때 발생하는 오류 수정 ([122edbe](https://github.com/KubrickCode/loa-work/commit/122edbe30c80c4b29e17a04ae4b4485b9f45c615))
* runtime 이미지에서 Prisma 클라이언트 생성 누락 문제 해결 ([10575d9](https://github.com/KubrickCode/loa-work/commit/10575d9a8903fc507f08e0ff7d8bcdf96cbed304))
* semantic-release 의존성 및 설정 추가 ([61769ba](https://github.com/KubrickCode/loa-work/commit/61769ba9a243095aa0e093cd76f1025693e866ac)), closes [#177](https://github.com/KubrickCode/loa-work/issues/177)
* semantic-release 자동화를 위한 릴리즈 프로세스 변경 ([0b8c773](https://github.com/KubrickCode/loa-work/commit/0b8c77357138b3e670b1c74766b2cf9cbafbd2d7)), closes [#177](https://github.com/KubrickCode/loa-work/issues/177)
* 글로벌 환경변수 설정 ([9282297](https://github.com/KubrickCode/loa-work/commit/92822979d06bf5ea17950371bd302c44e7f3d194))
* 기존 릴리즈 히스토리를 CHANGELOG.md에 추가 ([7cb4900](https://github.com/KubrickCode/loa-work/commit/7cb49004132d071a122d850ee3a6020b2931447f)), closes [#177](https://github.com/KubrickCode/loa-work/issues/177)
* 누락된 codegen 적용 ([7bfb370](https://github.com/KubrickCode/loa-work/commit/7bfb37067c85864b2d510f7b458c3e06025cbe15))
* 누락된 의존성 추가 ([bf85562](https://github.com/KubrickCode/loa-work/commit/bf8556278c54da5d8d52091d46f5bc51e0e68833))
* 디스코드 웹훅 URL 환경변수명 변경 ([9afd41d](https://github.com/KubrickCode/loa-work/commit/9afd41d9ed44da2cf278ba8e7d904c17ad4ff520))
* 워크플로우 전용 문서는 git에 업로드되지 않도록 수정 ([334607b](https://github.com/KubrickCode/loa-work/commit/334607b338f5b64fbbfadfa8352f10201bfca3e6))
* 워크플로우 커맨드 이중 언어 문서 생성 기능 추가 ([10f20db](https://github.com/KubrickCode/loa-work/commit/10f20db054be81136f7d56bf8b4373f7818f70ef))
* 자주 사용하는 MCP 서버 추가 ([e8382c0](https://github.com/KubrickCode/loa-work/commit/e8382c00c97f72714878d8354ac9ea4f021632f5))
* 잘못된 형식의 문서 제거 ([c59429b](https://github.com/KubrickCode/loa-work/commit/c59429bbebd4f3d64882531fba8747c73cf02259))
* 저장 시와 lint 실행 시 포맷팅이 달라지는 문제 해결 ([563316e](https://github.com/KubrickCode/loa-work/commit/563316e9bb5435a4a7b6ed7925066c63cc2e2d57))
* 커밋 전 린트 오류 발견이 늦어 재작업이 발생하는 문제 개선 ([8b626bf](https://github.com/KubrickCode/loa-work/commit/8b626bfeb6530d53a25863f3114518b5eaab1e78))
* 패키지 매니저를 yarn에서 pnpm으로 마이그레이션 ([c596e11](https://github.com/KubrickCode/loa-work/commit/c596e11daf1b7f4e70d8d89a93a5415140c86011))

# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [v0.3.4](https://github.com/KubrickCode/loa-work/releases/tag/v0.3.4) - 2025-10-17

### 🚀 What's New in v0.3.4

- 0.3.4
- 테이블 스켈레톤 모바일 반응형 개선
- 아이템 시세 페이지 > 거래소 아이템 탭 판매 단위 폰트가 너무 큰 문제 수정

---

✅ **Successfully deployed to AWS**

- Website: https://loa-work.info
- All services are running

**Full Changelog**: https://github.com/KubrickCode/loa-work/compare/v0.3.3...v0.3.4

## [v0.3.3](https://github.com/KubrickCode/loa-work/releases/tag/v0.3.3) - 2025-10-16

### 🚀 What's New in v0.3.3

- 0.3.3
- 로그인 다이얼로그가 예상치 못한 동작과 함께 열리는 문제 수정
- Bump actions/setup-node from 5 to 6

---

✅ **Successfully deployed to AWS**

- Website: https://loa-work.info
- All services are running

### What's Changed

- Bump actions/setup-node from 5 to 6 by @dependabot[bot] in https://github.com/KubrickCode/loa-work/pull/164

**Full Changelog**: https://github.com/KubrickCode/loa-work/compare/v0.3.2...v0.3.3

## [v0.3.2](https://github.com/KubrickCode/loa-work/releases/tag/v0.3.2) - 2025-10-14

### 🚀 What's New in v0.3.2

- 화면이 작아지면 아이템 시세 페이지 테이블 내 섹션이 상위 섹션을 넘어가는 문제 수정

### Change logs

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
- ESLint 9 업그레이드 및 코드 정렬 규칙 강화로 코드 품질 표준화
- 설정 파일 포매팅 지원 추가 및 devcontainer 구조 개선
- go 코드포맷 추가
- Prettier 기반 코드 포매팅 표준화 및 전체 코드베이스 적용
- 컨테이너 claude code 기본 설치

---

✅ **Successfully deployed to AWS**

- Website: https://loa-work.info
- All services are running

### What's Changed

- Bump softprops/action-gh-release from 1 to 2 by @dependabot[bot] in https://github.com/KubrickCode/loa-work/pull/159
- Bump actions/setup-go from 5 to 6 by @dependabot[bot] in https://github.com/KubrickCode/loa-work/pull/163

**Full Changelog**: https://github.com/KubrickCode/loa-work/compare/v0.3.1...v0.3.2

## [v0.3.1](https://github.com/KubrickCode/loa-work/releases/tag/v0.3.1) - 2025-10-06

### 🚀 What's New in v0.3.1

### 유지보수

- 깃허브 릴리즈 워크플로우 추가
- 깃허브 후원 버튼 추가

---

✅ **Successfully deployed to AWS**

- Website: https://loa-work.info
- All services are running

**Full Changelog**: https://github.com/KubrickCode/loa-work/compare/v0.3.0...v0.3.1

## [v0.3.0](https://github.com/KubrickCode/loa-work/releases/tag/v0.3.0) - 2025-10-06

### 🎉 What's New in v0.3.0

### 개선

- 사이트 디자인 시스템 전면 교체

### 유지보수

- AI Agent 관련 설정 추가

**Full Changelog**: https://github.com/KubrickCode/loa-work/compare/v0.2.9...v0.3.0

## [v0.2.9](https://github.com/KubrickCode/loa-work/releases/tag/v0.2.9) - 2025-10-06

### 🎉 What's New in v0.2.9

### 유지보수

- 테스트 케이스 추가
- gorm -> SQLBoiler 로 go 코드 orm 교체
  - 변경으로 인해 스키마 작성 시 prisma, go 양 측에 중복 코드 작성하지 않아도 됨.

**Full Changelog**: https://github.com/KubrickCode/loa-work/compare/v0.2.8...v0.2.9

## [v0.2.8](https://github.com/KubrickCode/loa-work/releases/tag/v0.2.8) - 2025-10-06

### 🎉 What's New in v0.2.8

### 개선

- 푸터 디자인 개선
- 푸터 항상 보이도록 개선

### 버그 수정

- 테이블 셀 내용이 길 때 내용이 셀을 넘어가는 문제 수정
- 페이지 새로고침 시 푸터 배경이 사라지는 문제 수정

**Full Changelog**: https://github.com/KubrickCode/loa-work/compare/v0.2.7...v0.2.8

## [v0.2.7](https://github.com/KubrickCode/loa-work/releases/tag/v0.2.7) - 2025-10-06

### 🎉 What's New in v0.2.7

### 개선

- 후원 안내 팝오버 추가

**Full Changelog**: https://github.com/KubrickCode/loa-work/compare/v0.2.6...v0.2.7

## [v0.2.6](https://github.com/KubrickCode/loa-work/releases/tag/v0.2.6) - 2025-10-06

### 🎉 What's New in v0.2.6

### 개선

- 구글 검색 노출 개선

**Full Changelog**: https://github.com/KubrickCode/loa-work/compare/v0.2.5...v0.2.6

## [v0.2.5](https://github.com/KubrickCode/loa-work/releases/tag/v0.2.5) - 2025-10-06

### 🎉 What's New in v0.2.5

### 새기능

- 컨텐츠 아카이브 기능 추가 및 UI에서 숨김처리
- 귀속 골��� 추가

### 개선

- 모든 아이템에 대해 컨텐츠 보상 수정 가능하도록 개선

**Full Changelog**: https://github.com/KubrickCode/loa-work/compare/v0.2.4...v0.2.5

## [v0.2.4](https://github.com/KubrickCode/loa-work/releases/tag/v0.2.4) - 2025-10-06

### 🎉 What's New in v0.2.4

### 새기능

- 시급 페이지 각 컨텐츠 즐겨찾기 기능 추가

**Full Changelog**: https://github.com/KubrickCode/loa-work/compare/v0.2.3...v0.2.4

## [v0.2.3](https://github.com/KubrickCode/loa-work/releases/tag/v0.2.3) - 2025-10-06

### 🎉 What's New in v0.2.3

### 새기능

- 서버 골드 환율 변경 시 디스코드 알림 기능 추가

**Full Changelog**: https://github.com/KubrickCode/loa-work/compare/v0.2.2...v0.2.3

## [v0.2.2](https://github.com/KubrickCode/loa-work/releases/tag/v0.2.2) - 2025-10-06

### 🎉 What's New in v0.2.2

### 새기능

- 시급 페이지 관문 합쳐보기 기능 추가

**Full Changelog**: https://github.com/KubrickCode/loa-work/compare/v0.2.1...v0.2.2

## [v0.2.1](https://github.com/KubrickCode/loa-work/releases/tag/v0.2.1) - 2025-10-06

### 🎉 What's New in v0.2.1

### 새기능

- 테이블 행 클릭 지원(모달 open, 링크 이동 등)
- 컨텐츠 상세 모달 추가
- Not Found 페이지 추가

### 개선

- 숫자 입력칸 화살표 클릭으로 쉽게 조정 가능하도록 개선

**Full Changelog**: https://github.com/KubrickCode/loa-work/compare/v0.2.0...v0.2.1

## [v0.2.0](https://github.com/KubrickCode/loa-work/releases/tag/v0.2.0) - 2025-10-06

### 🎉 What's New in v0.2.0

### 개선

- 데이터로더 도입 및 성능 개선
- 사용자 안내 툴팁 곳곳에 추가
- 소요시간 분, 초 단위로 수정 가능하도록 개선
- 시급 페이지에 현재 골드 환율 표시

### 유지보수

- grafana, prometheus, loki, promtail 기반 모니터링 서버 구축
- 합성 컴포넌트 패턴 도입
- 린트 규칙 추가
- 대부분 케이스 유닛테스트 추가
- E2E 테스트 추가

### 문서

- README 작성

### 버그 수정

- 모바일에서 검색 엔터 버튼이 보이지 않는 문제 수정

**Full Changelog**: https://github.com/KubrickCode/loa-work/compare/v0.1.4...v0.2.0

## [v0.1.4](https://github.com/KubrickCode/loa-work/releases/tag/v0.1.4) - 2025-10-06

### 🎉 What's New in v0.1.4

### 새기능

- 소유자가 컨텐츠 소요시간 수정 시 서버 데이터가 수정되도록 수정

**Full Changelog**: https://github.com/KubrickCode/loa-work/compare/v0.1.3...v0.1.4

## [v0.1.3](https://github.com/KubrickCode/loa-work/releases/tag/v0.1.3) - 2025-10-06

### 🎉 What's New in v0.1.3

### 개선

- 모달 내 본문 내에서 스크롤 되도록 개선

### 유지보수

- go test 환경 구축

**Full Changelog**: https://github.com/KubrickCode/loa-work/compare/v0.1.2...v0.1.3

## [v0.1.2](https://github.com/KubrickCode/loa-work/releases/tag/v0.1.2) - 2025-10-06

### 🎉 What's New in v0.1.2

### 새기능

- 유저 컨텐츠 보상 제보 기능 추가
- 어드민 페이지 추가
  - 컨텐츠 생성 기능 추가
  - 컨텐츠 보상 검증 기능 추가
  - 컨텐츠 보상 예측 기능 추가
- 테이블 헤더 고정 기능 추가
- 테이블 내 검색 필터 추가

### 개선

- 테이블 striped 스타일 제거
- 설명서 아코디언 디자인으로 개선
- 설명서 내용 보충

### 유지보수

- 로그로켓 및 sentry 세팅

**Full Changelog**: https://github.com/KubrickCode/loa-work/compare/v0.1.1...v0.1.2

## [v0.1.1](https://github.com/KubrickCode/loa-work/releases/tag/v0.1.1) - 2025-10-06

### 🎉 What's New in v0.1.1

### 개선

- 유물각인서 테이블 최저가 내림차순 정렬
- 보석 테이블 구매가 내림차순 정렬
- 전반적으로 반응형 레이아웃 개선
- 설명서 내용 작성

### 유지보수

- 테이블 내 모든 칼럼 선택적으로 정렬 가능하도록 수정

**Full Changelog**: https://github.com/KubrickCode/loa-work/compare/v0.1.0...v0.1.1

## [v0.1.0](https://github.com/KubrickCode/loa-work/releases/tag/v0.1.0) - 2025-10-06

### 🎉 What's New in v0.1.0

### 새기능

- AWS EC2, ECR 기반 웹 서비스, 수집 서비스 배포, 도메인 설정
- 마지막 아이템 시세 업데이트 일시 표시
- 시급 테이블 컨텐츠 레벨 정렬 기능 추가
- 시급, 보상 페이지 차트 추가 및 표, 차트 탭 분리
- 사이트 타이틀 추가 -> 프로젝트명을 로���장으로 결정
- 파비콘 추가
- 시급 페이지 1수당 골드 추가
- 푸터 추가
- 컨텐츠 시급 계산기 추가
- 서비스 이용 설명서 추가

### 개선

- 귀속 재료 표시 아이콘으로 변경
- 각 섹션 제목 표시
- 가격 통계 데이터 조회 성능 개선

### 버그 수정

- 정렬 버튼 색상이 다크모드가 고려되지 않은 문제 수정

### 유지보수

- 린트 규칙 추가
- 테스트 워크플로우 구조 개선

**Full Changelog**: https://github.com/KubrickCode/loa-work/compare/v0.0.23...v0.1.0

## [v0.0.23](https://github.com/KubrickCode/loa-work/releases/tag/v0.0.23) - 2025-10-06

### 🎉 What's New in v0.0.23

### 새기능

- 각종 아이템, 컨텐츠 카테고리 등 이미지 칼럼 추가
- 시급페이지 컨텐츠 레벨 추가

**Full Changelog**: https://github.com/KubrickCode/loa-work/compare/v0.0.22...v0.0.23

## [v0.0.22](https://github.com/KubrickCode/loa-work/releases/tag/v0.0.22) - 2025-10-06

### 🎉 What's New in v0.0.22

### 새기능

- 아이템 시세 페이지 분할 레이아웃 디자인 적용
- 아이템 시세 페이지 각종 가격 정렬 기능 추가

**Full Changelog**: https://github.com/KubrickCode/loa-work/compare/v0.0.21...v0.0.22

## [v0.0.21](https://github.com/KubrickCode/loa-work/releases/tag/v0.0.21) - 2025-10-06

### 🎉 What's New in v0.0.21

### 새기능

- 아이템 시세 페이지 재련 추가 재료 추가
- 아이템 시세 페이지 유물각인서 추가

**Full Changelog**: https://github.com/KubrickCode/loa-work/compare/v0.0.20...v0.0.21

## [v0.0.20](https://github.com/KubrickCode/loa-work/releases/tag/v0.0.20) - 2025-10-06

### 🎉 What's New in v0.0.20

### 새기능

- 아이템 시세 페이지에 기타 아이템 추가
- 기타 아이템(실링, 카드경험치) 골드 가치 수정 기능 추가

**Full Changelog**: https://github.com/KubrickCode/loa-work/compare/v0.0.19...v0.0.20

## [v0.0.19](https://github.com/KubrickCode/loa-work/releases/tag/v0.0.19) - 2025-10-06

### 🎉 What's New in v0.0.19

### 유지보수

- 테스트 코드 추가 및 강화

**Full Changelog**: https://github.com/KubrickCode/loa-work/compare/v0.0.18...v0.0.19

## [v0.0.18](https://github.com/KubrickCode/loa-work/releases/tag/v0.0.18) - 2025-10-06

### 🎉 What's New in v0.0.18

### 새기능

- 카카오 로그인 추가

**Full Changelog**: https://github.com/KubrickCode/loa-work/compare/v0.0.17...v0.0.18

## [v0.0.17](https://github.com/KubrickCode/loa-work/releases/tag/v0.0.17) - 2025-10-06

### 🎉 What's New in v0.0.17

### 새기능

- 유저별 컨텐츠 소요시간 커스터마이징 기능 추가
- 유저별 골드 환율 커스터마이징 기능 추가

**Full Changelog**: https://github.com/KubrickCode/loa-work/compare/v0.0.16...v0.0.17

## [v0.0.16](https://github.com/KubrickCode/loa-work/releases/tag/v0.0.16) - 2025-10-06

### 🎉 What's New in v0.0.16

### 개선

- 컨텐츠별 보상 모달에서 수정가능하도록 개선
- 데이터 변경 성공 시 기본적으로 토스트 메시지 표시되도록 개선
- 골드 및 가격 표시 포맷 개선

**Full Changelog**: https://github.com/KubrickCode/loa-work/compare/v0.0.15...v0.0.16

## [v0.0.15](https://github.com/KubrickCode/loa-work/releases/tag/v0.0.15) - 2025-10-06

### 🎉 What's New in v0.0.15

### 새기능

- 컨텐츠 보상 유저별 커스터마이징 기능 추가

**Full Changelog**: https://github.com/KubrickCode/loa-work/compare/v0.0.14...v0.0.15

## [v0.0.14](https://github.com/KubrickCode/loa-work/releases/tag/v0.0.14) - 2025-10-06

### 🎉 What's New in v0.0.14

### 새기능

- 소셜 로그인 기능 추가

**Full Changelog**: https://github.com/KubrickCode/loa-work/compare/v0.0.13...v0.0.14

## [v0.0.13](https://github.com/KubrickCode/loa-work/releases/tag/v0.0.13) - 2025-10-06

### 🎉 What's New in v0.0.13

### 새기능

- 아이템 시세 페이지 추가

**Full Changelog**: https://github.com/KubrickCode/loa-work/compare/v0.0.12...v0.0.13

## [v0.0.12](https://github.com/KubrickCode/loa-work/releases/tag/v0.0.12) - 2025-10-06

### 🎉 What's New in v0.0.12

### 개선

- 전반적인 여백, 레이아웃 변경
- 각 테이블에 조회용 각종 편의 필터 추가
- 테이블 디자인 개선
- 로딩 처리 UI/UX 개선

**Full Changelog**: https://github.com/KubrickCode/loa-work/compare/v0.0.11...v0.0.12

## [v0.0.11](https://github.com/KubrickCode/loa-work/releases/tag/v0.0.11) - 2025-10-06

### 🎉 What's New in v0.0.11

### 유지보수

- 테스트 환경 및 테스트 코드 추가

**Full Changelog**: https://github.com/KubrickCode/loa-work/compare/v0.0.10...v0.0.11

## [v0.0.10](https://github.com/KubrickCode/loa-work/releases/tag/v0.0.10) - 2025-10-06

### 🎉 What's New in v0.0.10

### 새기능

- 대시보드에 컨텐츠별 시급 표시

**Full Changelog**: https://github.com/KubrickCode/loa-work/compare/v0.0.9...v0.0.10

## [v0.0.9](https://github.com/KubrickCode/loa-work/releases/tag/v0.0.9) - 2025-10-06

### 🎉 What's New in v0.0.9

### 새기능

- 웹 페이지 기본 레이아웃 구축
  - 페이지 라우터 추가
  - 헤더, 네비게이션 추가
- 기본 페이지 생성
  - 대시보드 페이지(default)
  - 컨텐츠 보상 페이지
- 다크모드 추가

**Full Changelog**: https://github.com/KubrickCode/loa-work/compare/v0.0.8...v0.0.9

## [v0.0.8](https://github.com/KubrickCode/loa-work/releases/tag/v0.0.8) - 2025-10-06

### 🎉 What's New in v0.0.8

### 유지보수

- 컨텐츠, 컨텐츠 보상 기능을 위한 기본 구조 구축

**Full Changelog**: https://github.com/KubrickCode/loa-work/compare/v0.0.7...v0.0.8

## [v0.0.7](https://github.com/KubrickCode/loa-work/releases/tag/v0.0.7) - 2025-10-06

### 🎉 What's New in v0.0.7

### 새기능

- 경매장 아이템 가격 통계 수집 서비스 추가

**Full Changelog**: https://github.com/KubrickCode/loa-work/compare/v0.0.6...v0.0.7

## [v0.0.6](https://github.com/KubrickCode/loa-work/releases/tag/v0.0.6) - 2025-10-06

### 🎉 What's New in v0.0.6

### 새기능

- 거래소 아이템 가격 통계 데이터 수집 서비스 추가

**Full Changelog**: https://github.com/KubrickCode/loa-work/compare/v0.0.5...v0.0.6

## [v0.0.5](https://github.com/KubrickCode/loa-work/releases/tag/v0.0.5) - 2025-10-06

### 🎉 What's New in v0.0.5

### 새 기능

- 거래소 아이템 수집 기능 추가

**Full Changelog**: https://github.com/KubrickCode/loa-work/compare/v0.0.4...v0.0.5

## [v0.0.4](https://github.com/KubrickCode/loa-work/releases/tag/v0.0.4) - 2025-10-06

### 🎉 What's New in v0.0.4

### 유지보수

- 테스트 코드 및 테스트 워크플로우 추가

**Full Changelog**: https://github.com/KubrickCode/loa-work/compare/v0.0.3...v0.0.4

## [v0.0.3](https://github.com/KubrickCode/loa-work/releases/tag/v0.0.3) - 2025-10-06

### 🎉 What's New in v0.0.3

### 새기능

- 거래소 아이템 카테고리 수집 서비스 구현

**Full Changelog**: https://github.com/KubrickCode/loa-work/compare/v0.0.2...v0.0.3

## [v0.0.2](https://github.com/KubrickCode/loa-work/releases/tag/v0.0.2) - 2025-10-06

### 🎉 What's New in v0.0.2

수집 서비스 구축용 go 인프라 및 orm 설정

**Full Changelog**: https://github.com/KubrickCode/loa-work/compare/v0.0.1...v0.0.2

## [v0.0.1](https://github.com/KubrickCode/loa-work/releases/tag/v0.0.1) - 2025-10-06

### 🎉 What's New in v0.0.1

기본 프로젝트 구조 설정 및 개발 환경 구축

**Full Changelog**: https://github.com/KubrickCode/loa-work/compare/v0.0.1
