// src/app.module.ts
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from './model/user/user.service';
import { UserController } from './model/user/user.controller';
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
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
    MoviesModule,
  ],
  controllers: [UserController],
  providers: [UserService, JwtStrategy, GoogleStrategy],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtAuthMiddleware)
      .forRoutes('user/profile'); // Áp dụng middleware cho route cần bảo vệ
  }
}
