import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Body,
  UseGuards,
  Req,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateImageDto } from './dto/image.dto';
import { ImageService } from './image.service';
import { JwtAuthGuard } from '../../auth/jwt.guards';
import { Response, Request as ExpressRequest } from 'express';

@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post()
  @UseInterceptors(FileInterceptor('img_file'))
  async uploadImage(
    @Req() req: ExpressRequest,
    @UploadedFile() file: Express.Multer.File,
    @Body() createImageDto: CreateImageDto,
  ) {
    return this.imageService.createImage(createImageDto.email, file);
  }
}
