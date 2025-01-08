import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateImageDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  @IsNotEmpty()
  img_file: any;
}
