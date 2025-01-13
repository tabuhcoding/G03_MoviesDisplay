import { SchemaFactory, Schema } from "@nestjs/mongoose"
import { Document } from "mongoose"

@Schema({ collection: 'scrap_people', strict: false })
export class People extends Document {
  name: string;
  also_known_as: string[];
}
@Schema({ collection: 'scrap_people_popular', strict: false })
export class PeoplePopular extends Document {}
@Schema({ collection: 'scrap_people_trending_day', strict: false })
export class PeopleTrendingDay extends Document {}
@Schema({ collection: 'scrap_people_trending_week', strict: false })
export class PeopleTrendingWeek extends Document {}

export const PeopleSchema = SchemaFactory.createForClass(People);
export const PeoplePopularSchema = SchemaFactory.createForClass(PeoplePopular);
export const PeopleTrendingDaySchema = SchemaFactory.createForClass(PeopleTrendingDay);
export const PeopleTrendingWeekSchema = SchemaFactory.createForClass(PeopleTrendingWeek);