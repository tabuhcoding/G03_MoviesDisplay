import { SchemaFactory, Schema } from "@nestjs/mongoose"
import { Document } from "mongoose"

@Schema({ collection: 'scrap_movie_genres', strict: false })
export class ScrapMovieGenres extends Document {
  tmdb_id: number;
  id: number;
  name: string;
}