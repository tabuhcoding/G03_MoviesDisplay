// src/app.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './model/user/auth-core/user.module';
import { MoviesModule } from './model/movies/movies.module';
import { ConfigModule } from '@nestjs/config';
import { ImageModule } from './model/image/image.module';
import { OtpModule } from './model/user/otp/otp.module';
import { PeopleModule } from './model/people/people.module';
import { NavigateModule } from './model/natigate/navigate.module';

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
    PeopleModule,
    NavigateModule,
  ],
})
export class AppModule {}
