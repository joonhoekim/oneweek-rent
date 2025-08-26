import { Injectable } from '@nestjs/common';
import type { Request, Response } from 'express';
import * as trpcExpress from '@trpc/server/adapters/express';
import { appRouter } from '../../../libs/shared-api/src/lib/app.router';

@Injectable()
export class TrpcService {
  private trpcHandler: ReturnType<typeof trpcExpress.createExpressMiddleware>;

  constructor() {
    this.trpcHandler = trpcExpress.createExpressMiddleware({
      router: appRouter,
      createContext: ({ req, res }) => ({ req, res }),
    });
  }

  async handler(req: Request, res: Response) {
    return new Promise<void>((resolve) => {
      this.trpcHandler(req, res, () => resolve());
    });
  }
}
