import { SchemaFactory, Schema } from "@nestjs/mongoose"
import { Document } from "mongoose"

@Schema({ collection: 'watchlists', strict: false })
export class WatchLists extends Document {
  email: string;
  movieId: number;
  createdAt: Date;
}