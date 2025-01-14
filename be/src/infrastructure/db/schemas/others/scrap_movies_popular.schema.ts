import { SchemaFactory, Schema } from "@nestjs/mongoose"
import { Document } from "mongoose"

@Schema({ collection: 'scrap_movies_popular', strict: false })
export class ScrapMoviesPopular extends Document {
  tmdb_id: number;
  adult: boolean;
  backdrop_path: any;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: any;
  vote_count: number;
}