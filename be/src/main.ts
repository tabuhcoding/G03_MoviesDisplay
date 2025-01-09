// src/main.ts
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { GlobalResponseInterceptor } from './common/filters/global-response.interceptor';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [ process.env.FRONTEND_URL ], 
    credentials: true,
  });
  app.use(express.json());
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalInterceptors(new GlobalResponseInterceptor());
  await app.listen(3001);
}
bootstrap();