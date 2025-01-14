import { SchemaFactory, Schema } from "@nestjs/mongoose"
import { Document } from "mongoose"

@Schema({ collection: 'images', strict: false })
export class Images extends Document {
  email: string;
  movieId: number;
  createdAt: Date;
}