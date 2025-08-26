import { Controller, All, Req, Res } from '@nestjs/common';
import type { Request, Response } from 'express';
import { TrpcService } from './trpc.service';

@Controller('trpc')
export class TrpcController {
  constructor(private readonly trpc: TrpcService) {}

  @All('*')
  async handler(@Req() req: Request, @Res() res: Response) {
    return this.trpc.handler(req, res);
  }
}
