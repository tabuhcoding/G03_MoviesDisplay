import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Image extends Document {
  @Prop({ required: true })
  img_url: string;

  @Prop({ required: true })
  create_by: string;

  @Prop({ default: Date.now })
  create_at: Date;
}

export const ImageSchema = SchemaFactory.createForClass(Image);
