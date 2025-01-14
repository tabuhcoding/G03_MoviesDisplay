import { SchemaFactory, Schema } from "@nestjs/mongoose"
import { Document } from "mongoose"

@Schema({ collection: 'scrap_movies_similar_ref', strict: false })
export class ScrapMoviesSimilarRef extends Document {
  moviesID: number;
  similar: number[];
}