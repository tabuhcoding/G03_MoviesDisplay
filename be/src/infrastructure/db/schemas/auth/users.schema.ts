import { SchemaFactory, Schema } from "@nestjs/mongoose"
import { Document } from "mongoose"

@Schema({ collection: 'users', strict: false })
export class Users extends Document {
  username: string;
  email: string;
  password: string;
  googleId: any;
  avatar: string;
  createdAt: Date;
}