import { SchemaFactory, Schema } from "@nestjs/mongoose"
import { Document } from "mongoose"

@Schema({ collection: 'scrap_movies_now_playing', strict: false })
export class ScrapMoviesNowPlaying extends Document {
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