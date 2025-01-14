import { SchemaFactory, Schema } from "@nestjs/mongoose"
import { Document } from "mongoose"

@Schema({ collection: 'favoritelists', strict: false })
export class Favoritelists extends Document {
  email: string;
  movieId: number;
  createdAt: Date;
}