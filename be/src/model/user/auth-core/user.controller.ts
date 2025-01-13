import { Body, Controller, Get, Post, UseGuards, Res, Req, UseInterceptors, UploadedFile, HttpException, HttpStatus, UsePipes, ValidationPipe, Headers, UploadedFiles } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { GetUserDto } from '../dto/get-user.dto';
import { ResetPasswordDto } from '../dto/reset-password.dto';
import { UpdateAvatarDto } from '../dto/update-avatar.dto';
import { JwtAuthGuard } from '../../../auth/jwt.guards';
import { AuthGuard } from '@nestjs/passport';
import { Response, Request as ExpressRequest } from 'express';
import { UpdateUserDto } from '../dto/update-user.dto';
import { AnyFilesInterceptor, FileInterceptor } from '@nestjs/platform-express';
import axios from 'axios';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('register')
  @UsePipes(new ValidationPipe({ transform: true }))
  async register(@Body() createUserDto: CreateUserDto) {
    return this.userService.register(createUserDto);
  }

  @Post('login')
  @UsePipes(new ValidationPipe({ transform: true }))
  async login(@Body() getUserDto: GetUserDto) {
    return this.userService.login(getUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Req() req: ExpressRequest) {
    const user = req.user; // `req.user` được gắn bởi JwtAuthGuard sau khi token được xác minh
    return { message: 'User profile fetched successfully', user };
  }

  @UseGuards(JwtAuthGuard)
  @Post('update-profile')
  async updateProfile(@Req() req: ExpressRequest, @Body() updateUserDto: UpdateUserDto) {
    const user = req.user; // `req.user` được gắn bởi JwtAuthGuard sau khi token được xác minh
    return this.userService.updateProfile(user, updateUserDto);
  }

  @Post('update-avatar')
  @UsePipes(new ValidationPipe({ transform: true }))
  async updateAvatar(@Body() body: UpdateAvatarDto) {
    return this.userService.updateAvatar(body.email, body.img_file);
  }


  // @Get('google')
  // @UseGuards(AuthGuard('google'))
  // async googleAuth(@Req() req) {
  //   // Initiates Google authentication
  // }

  // @Get('google/callback')
  // @UseGuards(AuthGuard('google'))
  // async googleAuthRedirect(@Req() req: ExpressRequest, @Res() res: Response) {
  //   const user = req.user; // Thông tin người dùng từ Google
  //   const { token, user: userData } = await this.userService.handleGoogleUser(user);

  //   return res.redirect(
  //     `${process.env.FRONTEND_URL}/login-response?token=${token}&user=${encodeURIComponent(JSON.stringify(userData))}`
  //   );
  // }

  @Post('google')
  async googleLogin(@Headers('authorization') authHeader: string) {
    try {
      const token = authHeader?.split(' ')[1];
      // Xác thực token với Google
      const googleUser = await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${token}`
      );
      const { data } = googleUser;
       // Xử lý user trong database
      const { token: jwtToken, user } = await this.userService.handleGoogleUser(data);
      return { token: jwtToken, user };
    } catch (error) {
      throw new HttpException('Invalid Google token', HttpStatus.UNAUTHORIZED);
    }
  }
  
  @Post('forgot-password')
  async forgotPassword(@Body() body: { email: string }) {
    const otpInfo = await this.userService.getUserByEmail(body.email);

    return {
      success: true,
      message: 'OTP đã được gửi đến email của bạn',
      expiresAt: otpInfo.expiresAt,
      remainingAttempts: otpInfo.remainingAttempts,
    };
  }

  @Post('reset-password')
  @UsePipes(new ValidationPipe({ transform: true }))
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.userService.resetPassword(resetPasswordDto);
  }

  @Post('send-otp')
  @UsePipes(new ValidationPipe({ transform: true }))
  async sendOTP(@Body() body: { email: string }) {
    return this.userService.sendOTP(body.email);
  }
}
