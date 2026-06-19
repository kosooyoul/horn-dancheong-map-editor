# Horn Dancheong Map Editor

게임 개발을 위한 웹 기반 맵 에디터입니다. React, Next.js, TypeScript, TailwindCSS를 사용하여 개발되었습니다.

## 🚀 주요 기능

- 🎨 **직관적인 UI**: 드래그 앤 드롭으로 쉬운 맵 편집
- ⚡ **빠른 성능**: 웹 기술 기반의 반응성 좋은 편집 환경
- 💾 **다양한 포맷 지원**: JSON, XML 등 다양한 포맷으로 맵 데이터 내보내기
- 🌙 **다크 모드 지원**: 사용자 환경에 맞는 테마 자동 적용
- 📱 **반응형 디자인**: 다양한 화면 크기에서 최적화된 UI

## 🛠️ 기술 스택

- **Frontend**: React 19, Next.js 16
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Development**: ESLint, Hot Reload

## 📦 설치 및 실행

### 개발 환경 시작

```bash
# 의존성 설치
npm install

# 개발 서버 시작
npm run dev
```

개발 서버가 시작되면 [http://localhost:3000](http://localhost:3000)에서 애플리케이션을 확인할 수 있습니다.

### 빌드 및 배포

```bash
# 프로덕션 빌드
npm run build

# 프로덕션 서버 시작
npm start
```

### 코드 품질 검사

```bash
# ESLint 실행
npm run lint
```

## 📁 프로젝트 구조

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # 루트 레이아웃
│   ├── page.tsx           # 메인 페이지
│   └── globals.css        # 글로벌 스타일
├── components/            # 재사용 가능한 컴포넌트
│   ├── Button.tsx         # 버튼 컴포넌트
│   └── Header.tsx         # 헤더 컴포넌트
├── types/                 # TypeScript 타입 정의
│   └── index.ts           # 맵 에디터 관련 타입
├── utils/                 # 유틸리티 함수
│   └── mapUtils.ts        # 맵 관련 유틸리티
└── hooks/                 # Custom React Hooks
```

## 🎯 개발 가이드라인

### 코드 스타일
- **함수명**: 설명적인 이름 사용, 이벤트 핸들러는 `handle` 접두사
- **컴포넌트**: 화살표 함수와 `const` 사용
- **스타일링**: TailwindCSS 유틸리티 클래스만 사용
- **접근성**: 모든 상호작용 요소에 `tabIndex`, `aria-label` 포함

### 타입 정의
- 모든 Props, Response, State에 대해 타입 정의
- `src/types/` 디렉토리에 공통 타입 관리

## 🤝 기여하기

1. Fork 프로젝트
2. Feature 브랜치 생성 (`git checkout -b feature/새기능`)
3. 변경사항 커밋 (`git commit -am '새기능 추가'`)
4. 브랜치에 Push (`git push origin feature/새기능`)
5. Pull Request 생성

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.
