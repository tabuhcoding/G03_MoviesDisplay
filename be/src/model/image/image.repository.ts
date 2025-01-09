import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Image } from './schema/image.schema';
@Injectable()
export class ImageRepository {
  constructor(@InjectModel(Image.name, 'auth') private readonly imageModel: Model<Image>) {}

  async createImage(imageData: Partial<Image>): Promise<Image> {
    const newImage = new this.imageModel(imageData);
    return newImage.save();
  }
}
