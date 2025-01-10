import { IsEmail, IsNotEmpty } from 'class-validator';

export class UpdateAvatarDto {
  @IsNotEmpty()
  img_file: string;

  @IsEmail()
  email: string;

}
