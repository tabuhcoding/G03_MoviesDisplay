import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateImageDto } from './dto/image.dto';
import { uploadToCloudinary } from '@/config/cloudinary.config';
import { ImageRepository } from './image.repository';

@Injectable()
export class ImageService {
  constructor(private readonly imageRepository: ImageRepository) {}

  async createImage(createImageDto: CreateImageDto, file: Express.Multer.File) {
    if (!file) throw new BadRequestException('File is required');

    // Upload to Cloudinary
    const result: any = await uploadToCloudinary(file.buffer, file.originalname);

    // Save to database
    const savedImage = await this.imageRepository.createImage({
      img_url: result.secure_url,
      create_by: createImageDto.create_by,
    });

    return {
      id: savedImage.id,
      url: savedImage.img_url,
    };
  }
}