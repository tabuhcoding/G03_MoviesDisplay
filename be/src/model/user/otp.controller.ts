import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { OtpService } from './otp.service';

@Controller('otp')
export class OtpController {
  constructor(private readonly otpService: OtpService) {}

  @Post('request')
  async requestOtp(@Body() body: { email: string }) {
    const response = await this.otpService.sendOtpMail(body.email);
    return { message: 'OTP đã được gửi đến email của bạn', timeLeft: response.expiresAt, remainingAttempts: response.remainingAttempts };
  }

  @Post('verify')
  async verifyOtp(@Body() body: { email: string; otp: string }) {
    const isValid = await this.otpService.verifyOtp(body.email, body.otp);

    if (isValid) {
      return {
        statusCode: 200,
        message: 'Xác thực thành công'
      };
    }
    
    throw new BadRequestException({
      statusCode: 400,
      message: 'Mã OTP không hợp lệ',
      error : 'Bad Request'
    });
  }
}