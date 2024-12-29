import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { CreateImageDto } from './dto/image.dto';
import { uploadToCloudinary } from '@/config/cloudinary.config';
import { ImageRepository } from './image.repository';

@Injectable()
export class ImageService {
  constructor(private readonly imageRepository: ImageRepository) {}

  async createImage(userEmail: string, file: Express.Multer.File) {
    if (!file) throw new BadRequestException('File is required');
    try {
      // Upload to Cloudinary
      const result: any = await uploadToCloudinary(file.buffer, file.originalname);

      // Save to database
      const savedImage = await this.imageRepository.createImage({
        img_url: result.secure_url,
        create_by: userEmail,
      });

      return {
        id: savedImage.id,
        url: savedImage.img_url,
      };
    } catch (error) {
      console.error('Error uploading image:', error);

      throw new InternalServerErrorException('An error occurred while processing the image upload');
    }

  }
}