import { IsString, IsNotEmpty, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateImageDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  @IsNotEmpty()
  img_file: any;

  @IsEmail()
  email: string;
}
