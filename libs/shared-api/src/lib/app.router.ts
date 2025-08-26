import { router } from './trpc';
import { userRouter } from './routers/user.router';
import { rentalRouter } from './routers/rental.router';

// 메인 애플리케이션 라우터
export const appRouter = router({
  user: userRouter,
  rental: rentalRouter,
});

// 타입 내보내기 (클라이언트에서 사용)
export type AppRouter = typeof appRouter;
