import { SchemaFactory, Schema } from "@nestjs/mongoose"
import { Document } from "mongoose"

@Schema({ collection: 'scrap_movies_trending_day', strict: false })
export class ScrapMoviesTrendingDay extends Document {
  adult: boolean;
  backdrop_path: any;
  genre_ids: number[];
  id: number;
  title: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  media_type: string;
  release_date: string;
  video: boolean;
  vote_average: any;
  vote_count: number;
}