import { SchemaFactory, Schema } from "@nestjs/mongoose"
import { Document } from "mongoose"

@Schema({ collection: 'ratings', strict: false })
export class Ratings extends Document {
  email: string;
  movieId: number;
  rating: number;
  reviews: string;
  createdAt: Date;
}