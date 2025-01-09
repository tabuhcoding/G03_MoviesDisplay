// src/people/people.module.ts
import { Module } from '@nestjs/common';
import { PeopleController } from './people.controller';
import { PeopleService } from './people.service';
import { PeopleRepository } from './people.repository';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import {
  PeopleSchema,
  PeoplePopularSchema,
  PeopleTrendingDaySchema,
  PeopleTrendingWeekSchema,
} from './schema/empty.schema';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature(
      [
        { name: 'scrap_people', schema: PeopleSchema },
        { name: 'scrap_people_trending_day', schema: PeopleTrendingDaySchema },
        { name: 'scrap_people_trending_week', schema: PeopleTrendingWeekSchema },
        { name: 'scrap_people_popular', schema: PeoplePopularSchema },
      ],
      'otherNoSQL',
    ),
  ],
  controllers: [PeopleController],
  providers: [PeopleService, PeopleRepository],
})
export class PeopleModule {}