// src/app.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './model/user/user.module';
import { MoviesModule } from './model/movies/movies.module';
import { ConfigModule } from '@nestjs/config';
import { ImageModule } from './model/image/image.module';
import { OtpModule } from './model/user/otp.module';

@Module({
  imports: [
    ConfigModule.forRoot( {isGlobal: true}),
    MongooseModule.forRoot(process.env.MONGODB_URL_AUTH, {
      connectionName: 'auth',
    }),
    MongooseModule.forRoot(process.env.MONGODB_URL_CUSTOMDATA, {
      connectionName: 'customData',
    }),
    MongooseModule.forRoot(process.env.MONGODB_URL_OTHERSCRAP, {
      connectionName: 'otherNoSQL',
    }),
    MongooseModule.forRoot(process.env.MONGODB_URL_MOVIESSCRAP, {
      connectionName: 'moviesNoSQL',
    }),
    MoviesModule,
    UserModule,
    ImageModule,
    OtpModule,
  ],
})
export class AppModule {}
