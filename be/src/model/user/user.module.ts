import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { User, UserSchema } from './schema/user.schema';
import { GoogleStrategy } from '@/auth/google.strategies';
import { JwtStrategy } from '@/auth/jwt.strategies';
import { JwtModule } from '@nestjs/jwt';
import { NestModule, MiddlewareConsumer } from '@nestjs/common';
import { JwtAuthMiddleware } from '@/auth/middlewares/jwt-auth.middleware';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [  JwtStrategy, GoogleStrategy,
    UserService, UserRepository,],
  controllers: [UserController],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtAuthMiddleware)
      .forRoutes('user/profile'); // Áp dụng middleware cho route cần bảo vệ
  }
}
