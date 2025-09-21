# 백엔드 테스트 구현 체크리스트

## 🎯 테스트 구현 규칙

- **커밋 단위**: 메서드 하나당 하나의 커밋
- **테스트 범위**: 각 메서드의 모든 중요한 케이스 (당연한 테스트는 제외)
- **리팩토링**: 없음, 기존 코드 구조 유지

## 📋 커밋별 작업 체크리스트

### Commit 1: ContentWageService.getContentGroupWage() 테스트

**파일**: `src/backend/src/content/service/content-wage.service.spec.ts`

**테스트 케이스 체크리스트**:

- [x] 다중 컨텐츠 수익 합산 정확성 검증
- [x] 환율 변환 적용 검증 (KRW ↔ USD)
- [x] 사용자별 커스텀 설정 적용 검증
- [x] 빈 배열 입력 시 처리
- [ ] null/undefined 컨텐츠 필터링
- [x] 서로 다른 통화 혼재 시 처리
- [x] 환율 데이터 없을 때 fallback 처리

**커밋 메시지**: `test: add ContentWageService.getContentGroupWage() tests`

---

### Commit 2: ContentWageService.calculateSeeMoreRewardsGold() 테스트

**파일**: `src/backend/src/content/service/content-wage.service.spec.ts`

**테스트 케이스 체크리스트**:

- [ ] 추가 보상 계산 로직 정확성
- [ ] 필터링 조건별 결과 검증
- [ ] 보상 타입별 gold 변환 정확성
- [ ] 0 보상일 때 처리
- [ ] 잘못된 보상 데이터 필터링
- [ ] 중복 보상 제거 로직

**커밋 메시지**: `test: add ContentWageService.calculateSeeMoreRewardsGold() tests`

---

### Commit 3: ContentDurationService.getValidatedTotalSeconds() 테스트

**파일**: `src/backend/src/content/service/content-duration.service.spec.ts` (신규 생성)

**테스트 케이스 체크리스트**:

- [ ] 분→초 변환 정확성 (1분 = 60초)
- [ ] 경계값 처리 (0분, 최대값)
- [ ] 에러 케이스: 60초 이상 입력
- [ ] 에러 케이스: 음수 입력
- [ ] 에러 케이스: 비정상적으로 큰 값 (365일 초과)
- [ ] 소수점 포함 시간 처리
- [ ] null/undefined 입력 시 에러 처리

**커밋 메시지**: `test: add ContentDurationService.getValidatedTotalSeconds() tests`

---

### Commit 4: ContentGroupWageListQuery.contentGroupWageList() 테스트

**파일**: `src/backend/src/content/query/content-group-wage-list.query.spec.ts` (신규 생성)

**테스트 케이스 체크리스트**:

- [ ] 그룹핑 로직 정확성 검증
- [ ] 정렬 옵션별 결과 검증 (수익률, 이름, 시간순)
- [ ] 빈 데이터 입력 시 처리
- [ ] 페이지네이션 동작 검증
- [ ] 필터 조건 적용 검증
- [ ] GraphQL 스키마 준수 검증
- [ ] 권한 없는 사용자 접근 시 처리

**커밋 메시지**: `test: add ContentGroupWageListQuery.contentGroupWageList() tests`

## 🔍 각 커밋에서 수행할 작업

### 1. 기존 코드 분석

- [ ] 대상 메서드의 구현 로직 파악
- [ ] 의존성 및 사용되는 다른 서비스 확인
- [ ] 입력/출력 타입 및 예외 상황 파악

### 2. 테스트 파일 설정

- [ ] 필요한 mock 객체 설정
- [ ] 테스트 데이터 준비
- [ ] beforeEach/afterEach 설정

### 3. 테스트 작성

- [ ] 각 케이스별 describe/it 블록 작성
- [ ] assertion 로직 구현
- [ ] edge case 및 error case 포함
