# Mobile App - React Native with tRPC

이 디렉토리는 React Native 모바일 앱을 위한 공간입니다.

## tRPC 설정 가이드

### 1. React Native 프로젝트 생성

```bash
# Expo를 사용하는 경우
npx create-expo-app@latest mobile --template

# 또는 React Native CLI를 사용하는 경우
npx react-native init mobile
```

### 2. 필요한 패키지 설치

```bash
cd mobile
npm install @trpc/client @trpc/react-query @tanstack/react-query superjson
```

### 3. tRPC 클라이언트 설정

```typescript
// lib/trpc.ts
import { createTRPCReact } from '@trpc/react-query';
import { httpBatchLink } from '@trpc/client';
import superjson from 'superjson';
import type { AppRouter } from 'shared-api';

export const trpc = createTRPCReact<AppRouter>();

export const trpcClient = trpc.createClient({
  transformer: superjson,
  links: [
    httpBatchLink({
      url: 'http://localhost:3001/trpc', // 개발 환경
      // url: 'https://your-api-domain.com/trpc', // 프로덕션 환경
    }),
  ],
});
```

### 4. Provider 설정

```typescript
// App.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { trpc, trpcClient } from './lib/trpc';
import { useState } from 'react';

export default function App() {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {/* 여기에 앱 컴포넌트들 */}
      </QueryClientProvider>
    </trpc.Provider>
  );
}
```

### 5. 사용 예시

```typescript
// components/UserList.tsx
import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { trpc } from '../lib/trpc';

export function UserList() {
  const { data: users, isLoading } = trpc.user.getAll.useQuery();

  if (isLoading) {
    return <Text>로딩 중...</Text>;
  }

  return (
    <FlatList
      data={users}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View>
          <Text>{item.name}</Text>
          <Text>{item.email}</Text>
        </View>
      )}
    />
  );
}
```

## 주요 특징

- **타입 안전성**: 백엔드와 동일한 타입 정의 사용
- **코드 공유**: `shared-api` 라이브러리를 통해 API 스키마 공유
- **실시간 업데이트**: React Query를 통한 캐싱 및 동기화
- **개발 편의성**: 자동완성과 타입 체크 지원

## 개발 서버 실행

```bash
# 백엔드 서버 실행 (다른 터미널)
cd ../backend
pnpm run start:dev

# 모바일 앱 실행
cd mobile
npm start
```