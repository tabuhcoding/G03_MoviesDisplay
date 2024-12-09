// src/main.ts
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [ process.env.FRONTEND_URL ], 
    credentials: true,
  });

  app.useGlobalFilters(new AllExceptionsFilter());
  await app.listen(3001);
}
bootstrap();