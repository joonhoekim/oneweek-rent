import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS 설정 (웹 앱과 모바일 앱에서 접근 가능하도록)
  app.enableCors({
    origin: ['http://localhost:3001', 'http://localhost:3000'], // 웹 앱 포트
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3001); // 웹 앱과 포트 충돌 방지
}
bootstrap();
