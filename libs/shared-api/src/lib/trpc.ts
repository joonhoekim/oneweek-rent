import { initTRPC } from '@trpc/server';
import superjson from 'superjson';

// tRPC 인스턴스 초기화
export const t = initTRPC.create({
  transformer: superjson,
});

// 기본 라우터와 프로시저 생성
export const router = t.router;
export const publicProcedure = t.procedure;
