import { SchemaFactory, Schema } from "@nestjs/mongoose"
import { Document } from "mongoose"

@Schema({ collection: 'scrap_movies_trending_week', strict: false })
export class ScrapMoviesTrendingWeek extends Document {}
@Schema({ collection: 'scrap_movies_trending_day', strict: false })
export class ScrapMoviesTrendingDay extends Document {}
@Schema({ collection: 'scrap_movie_genres', strict: false })
export class ScrapMovieGenres extends Document {}
@Schema({ collection: 'movies', strict: false })
export class Movies extends Document {}

export const MoviesSchema = SchemaFactory.createForClass(Movies);
export const ScrapMovieGenresSchema = SchemaFactory.createForClass(ScrapMovieGenres);
export const ScrapMoviesTrendingWeekSchema = SchemaFactory.createForClass(ScrapMoviesTrendingWeek);
export const ScrapMoviesTrendingDaySchema = SchemaFactory.createForClass(ScrapMoviesTrendingDay);