# GitHub Copilot 사용자 정의 지침

## 프로젝트 개요
이 프로젝트는 구조화된 AI 코딩 워크플로우를 사용하여 개발됩니다. PRD(Product Requirements Document)를 작성하고, 상세한 TASKS로 분해한 후, 체계적으로 구현합니다.

## 코딩 스타일 및 규칙

### TypeScript/React
- 모든 컴포넌트는 함수형 컴포넌트로 작성
- TypeScript strict 모드 사용
- Props는 명시적으로 타입 정의
- 상태 관리는 React hooks 사용 (useState, useEffect 등)

### 네이밍 규칙
- 컴포넌트: PascalCase (예: TodoList, TaskItem)
- 함수/변수: camelCase (예: handleClick, taskList)
- 상수: UPPER_SNAKE_CASE (예: MAX_ITEMS, API_URL)
- 파일명: kebab-case.tsx (예: todo-list.tsx)

### 코드 구조
- 각 파일은 하나의 주요 책임만 가짐 (Single Responsibility Principle)
- 재사용 가능한 로직은 별도의 hooks로 분리 (예: useTodoStorage)
- 유틸리티 함수는 lib/utils 디렉토리에 배치

### 테스트
- 모든 컴포넌트는 유닛 테스트 필수
- E2E 테스트는 주요 사용자 플로우에 대해 작성
- 유닛 테스트 파일은 tests/unit 디렉토리에 `.test.tsx` 확장자로 작성
- E2E 테스트 파일은 tests/e2e 디렉토리에 `.spec.ts` 확장자로 작성

## 작업 프로세스

### 1. PRD 기반 개발
- 새로운 기능을 시작하기 전에 반드시 PRD 문서(`docs/prd/PRD-[기능명].md`) 작성
- PRD에는 목표, 사용자 스토리, 기능 요구사항, 성공 지표 포함

### 2. TASKS 분해
- PRD를 기반으로 상세한 작업 목록(`docs/tasks/TASKS-[기능명].md`) 생성
- TASKS는 Epic(상위 목표)과 개별 Task로 구성
- 각 Task는 체크박스로 진행 상황 추적
- Task ID 형식: EPIC-01-01 (Epic 번호 - Task 번호)

### 3. 체계적 구현
- 한 번에 하나의 Task만 수행
- Task 완료 시 즉시 `[x]`로 체크 표시
- 각 Task 완료 후 검증 (테스트 실행, 코드 리뷰)

## Definition of Done (DoD)

각 Task는 다음 조건을 모두 충족해야 완료로 간주:

1. **코드 작성 완료**
   - 요구사항에 명시된 모든 기능 구현
   - TypeScript 타입 에러 없음
   - ESLint 규칙 준수

2. **테스트 작성 및 통과**
   - 유닛 테스트 작성 (컴포넌트/함수)
   - E2E 테스트 작성 (해당되는 경우)
   - 모든 테스트 통과 (npm test)

3. **문서화**
   - 복잡한 로직에 대한 주석 추가
   - README 또는 관련 문서 업데이트 (필요시)

4. **코드 리뷰**
   - 자기 검토: 불필요한 console.log 제거, 코드 정리
   - 스타일 가이드 준수 확인

5. **통합 확인**
   - 개발 서버에서 기능 동작 확인
   - 기존 기능에 영향 없음을 확인

## UI/UX 가이드라인

### Tailwind CSS 사용
- 유틸리티 클래스 우선 사용
- 공통 스타일 패턴은 컴포넌트로 추상화
- 반응형 디자인 필수 (mobile-first approach)

### 접근성 (a11y)
- 모든 대화형 요소에 적절한 ARIA 레이블 추가
- 키보드 네비게이션 지원
- 색상 대비 기준 준수

### 사용자 경험
- 로딩 상태 표시
- 에러 메시지는 명확하고 실행 가능한 내용
- 성공/실패 피드백 제공

## 파일 구조

```
project-root/
├── .github/
│   ├── copilot-instructions.md        # 이 파일
│   └── prompts/
│       ├── create-prd.prompt.md       # PRD 생성 프롬프트
│       ├── execute-task.prompt.md     # 단일 Task 실행 프롬프트
│       ├── generate-tasks.prompt.md   # TASKS 생성 프롬프트
│       └── run-epic.prompt.md         # Epic 배치 실행 프롬프트
├── app/                               # Next.js 앱 디렉토리
├── components/                        # 재사용 가능한 컴포넌트
├── docs/
│   ├── prd/                           # PRD 문서 디렉토리
│   │   └── PRD-[기능명].md             # 기능별 PRD 문서
│   └── tasks/                         # 작업 목록 디렉토리
│       └── TASKS-[기능명].md           # 기능별 작업 목록
├── labs/                              # 실습 자료
│   ├── lab01/                         
│   └── lab02/                         
├── lib/                               # 유틸리티 함수, hooks
└── tests/                             # 테스트 파일
    ├── e2e/                           # E2E 테스트
    └── unit/                          # 유닛 테스트
```

## 주요 용어 정의

- **PRD (Product Requirements Document)**: 제품 요구사항 문서. 기능의 목표, 사용자 스토리, 요구사항을 명확히 정의
- **TASKS**: PRD를 기반으로 생성된 상세한 작업 목록
- **Epic**: 여러 Task를 묶는 상위 목표 단위 (예: "사용자 인증 시스템")
- **Task**: Epic 내의 개별 작업 항목 (예: "로그인 폼 UI 구현")
- **DoD (Definition of Done)**: 작업 완료 기준. Task를 완료로 표시하기 전에 충족해야 할 조건들

## AI 에이전트 협업 가이드

- 모든 응답, 설명, 요약, 결과 보고, 산출물은 한국어를 사용합니다. (단, 파일명/폴더명은 영어)
- 요청이 모호할 경우 명확한 질문을 통해 확인
- 한 번에 많은 변경을 시도하지 말고, 점진적으로 구현
- 각 단계에서 테스트를 실행하여 검증
- 에러 발생 시 문제를 명확히 설명하고 해결책 제시
