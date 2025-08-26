import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from '../../libs/shared-api/src/lib/app.router';

export const trpc = createTRPCReact<AppRouter>();
