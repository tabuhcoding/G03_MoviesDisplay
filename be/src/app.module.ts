// src/app.module.ts
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from './model/user/user.service';
import { UserController } from './model/user/user.controller';
import { UserModule } from './model/user/user.module';
import { UserRepository } from './model/user/user.repository';
import { MoviesModule } from './model/movies/movies.module';
import { JwtStrategy } from './auth/jwt.strategies';
import { JwtAuthMiddleware } from './auth/middlewares/jwt-auth.middleware';
import { User, UserSchema } from './model/user/schema/user.schema';
import { ConfigModule } from '@nestjs/config';
import { GoogleStrategy } from './auth/google.strategies';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URL),
    MoviesModule,
    UserModule,
  ],
})
export class AppModule {}
