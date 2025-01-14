import { SchemaFactory, Schema } from "@nestjs/mongoose"
import { Document } from "mongoose"

@Schema({ collection: 'otps', strict: false })
export class Otps extends Document {
  email: string;
  otp: string;
  expiresAt: Date;
  remainingAttempts: number;
  createdAt: Date;
  updatedAt: Date;
}