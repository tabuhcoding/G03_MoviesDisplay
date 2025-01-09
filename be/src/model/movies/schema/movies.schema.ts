import { SchemaFactory, Schema } from "@nestjs/mongoose"
import { Document } from "mongoose"

@Schema()
export class Movies extends Document {
  
}

export const MoviesSchema = SchemaFactory.createForClass(Movies);