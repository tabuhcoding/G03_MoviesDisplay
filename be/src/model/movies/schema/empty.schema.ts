import { SchemaFactory, Schema } from "@nestjs/mongoose"
import { Document } from "mongoose"

@Schema()
export class Empty extends Document {
  
}

export const EmptySchema = SchemaFactory.createForClass(Empty);


@Schema({ collection: 'scrap_movies_trending_week', strict: false })
export class ScrapMoviesTrendingWeek extends Document {}
@Schema({ collection: 'scrap_movies_trending_day', strict: false })
export class ScrapMoviesTrendingDay extends Document {}
@Schema({ collection: 'scrap_movie_genres', strict: false })
export class ScrapMovieGenres extends Document {}

export const ScrapMovieGenresSchema = SchemaFactory.createForClass(ScrapMovieGenres);
export const ScrapMoviesTrendingWeekSchema = SchemaFactory.createForClass(ScrapMoviesTrendingWeek);
export const ScrapMoviesTrendingDaySchema = SchemaFactory.createForClass(ScrapMoviesTrendingDay);