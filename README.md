# OneWeek Rent - tRPC 모노레포

일주일 단위 물건 대여 서비스를 위한 tRPC 기반 모노레포 프로젝트입니다.

## 🏗️ 프로젝트 구조

```
oneweek-rent/
├── libs/
│   └── shared-api/          # 공유 tRPC API 라이브러리
│       ├── src/
│       │   ├── lib/
│       │   │   ├── trpc.ts         # tRPC 설정
│       │   │   ├── schemas.ts      # Zod 스키마 정의
│       │   │   ├── app.router.ts   # 메인 라우터
│       │   │   └── routers/        # 개별 라우터들
│       │   │       ├── user.router.ts
│       │   │       └── rental.router.ts
│       │   └── index.ts
├── backend/                 # NestJS 백엔드
│   ├── src/
│   │   ├── trpc/           # tRPC 서버 설정
│   │   │   ├── trpc.controller.ts
│   │   │   ├── trpc.service.ts
│   │   │   └── trpc.module.ts
│   │   └── app.module.ts
├── web/                     # Next.js 웹 앱
│   ├── app/
│   │   ├── providers.tsx   # tRPC Provider 설정
│   │   ├── page.tsx        # 메인 페이지 (데모)
│   │   └── layout.tsx
│   └── lib/
│       └── trpc.ts         # tRPC 클라이언트 설정
└── mobile/                  # React Native 앱 (준비됨)
    └── README.md           # 모바일 설정 가이드
```

## 🚀 주요 특징

### ✅ 완전한 타입 안전성
- 백엔드에서 프론트엔드까지 end-to-end 타입 안전성
- Zod를 사용한 런타임 타입 검증
- TypeScript 자동완성 및 타입 체크

### ✅ 코드 공유
- `shared-api` 라이브러리를 통해 API 스키마 공유
- 백엔드, 웹, 모바일에서 동일한 타입과 API 정의 사용

### ✅ 개발자 경험 최적화
- tRPC를 통한 RPC-style API 호출
- React Query 통합으로 캐싱 및 상태 관리
- 실시간 데이터 동기화

### ✅ 확장 가능한 구조
- 모노레포를 통한 효율적인 코드 관리
- 새로운 플랫폼(모바일) 쉽게 추가 가능

## 🛠️ 기술 스택

- **모노레포**: Nx
- **백엔드**: NestJS + tRPC Server
- **웹 프론트엔드**: Next.js + tRPC Client + React Query
- **모바일**: React Native + tRPC Client (준비됨)
- **타입 검증**: Zod
- **데이터 변환**: SuperJSON

## 📦 설치 및 실행

### 1. 의존성 설치
```bash
pnpm install
```

### 2. 개발 서버 실행

#### 백엔드 서버 (포트 3001)
```bash
pnpm dev:api
# 또는
nx run backend:start:dev
```

#### 웹 앱 (포트 3000)
```bash
pnpm dev:web
# 또는  
nx run web:dev
```

### 3. 빌드
```bash
# 모든 프로젝트 빌드
pnpm build
# 또는
nx run-many -t build

# 개별 프로젝트 빌드
nx run shared-api:build
nx run backend:build  
nx run web:build
```

## 🔧 API 사용 예시

### 백엔드 (shared-api 라이브러리)
```typescript
// libs/shared-api/src/lib/routers/user.router.ts
export const userRouter = router({
  getAll: publicProcedure.query(() => {
    return mockUsers;
  }),
  
  create: publicProcedure
    .input(CreateUserSchema)
    .mutation(({ input }) => {
      // 사용자 생성 로직
    }),
});
```

### 프론트엔드 (React)
```typescript
// web/app/page.tsx
function UserComponent() {
  // 타입 안전한 API 호출
  const { data: users } = trpc.user.getAll.useQuery();
  
  const createUser = trpc.user.create.useMutation({
    onSuccess: () => {
      utils.user.getAll.invalidate();
    },
  });
  
  return (
    <div>
      {users?.map(user => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
}
```

## 📱 모바일 앱 추가

모바일 앱을 추가하려면 `mobile/README.md` 파일의 가이드를 참고하세요.

## 🤝 기여 방법

1. 새로운 API가 필요한 경우 `shared-api` 라이브러리에 라우터 추가
2. 백엔드 로직이 필요한 경우 NestJS 서비스 구현
3. 프론트엔드에서 tRPC hooks 사용하여 API 호출

## 📄 라이센스

이 프로젝트는 MIT 라이센스 하에 배포됩니다.