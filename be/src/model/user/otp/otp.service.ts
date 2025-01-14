import { Injectable, BadRequestException } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { OtpRepository } from './otp.repository';

@Injectable()
export class OtpService {
  private transporter;

  constructor(private readonly otpRepository: OtpRepository) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  // Tạo mã OTP ngẫu nhiên 6 chữ số
  private generateOtp(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  // Gửi email mã OTP
  async sendOtpMail(email: string): Promise<{ expiresAt: Date; remainingAttempts: number; }> {
    const existingOtp = await this.otpRepository.findLatestOtp(email);

    if (existingOtp && existingOtp.expiresAt > new Date()) {
      throw new BadRequestException('OTP cũ vẫn còn hiệu lực, vui lòng thử lại sau.');
    }

    const otp = this.generateOtp();
    const expiresAt = new Date();
    const expiryDuration = parseInt(process.env.OTP_EXPIRE_SECONDS || '60', 10);
    expiresAt.setSeconds(expiresAt.getSeconds() + expiryDuration);

    // Xoá OTP cũ nếu có, sau đó lưu OTP mới với thời gian hết hạn
    await this.otpRepository.deleteOtp(email);
    const newOtp = await this.otpRepository.saveOtp(email, otp, expiresAt);

    const mailOptions = {
      from: `"Movie Display" <${process.env.MAIL_USER}>`,
      to: email,
      subject: 'Mã xác thực',
      text: `Đây là mã xác thực email của bạn. Mã gồm 6 ký tự và có giá trị trong vòng 60  giây. Mã xác thực: ${otp}.`
    };

    try {
      await this.transporter.sendMail(mailOptions);
      
      return {
        expiresAt: newOtp.expiresAt,
        remainingAttempts: newOtp.remainingAttempts
      };
    } catch (error) {
      console.error('Failed to send OTP email:', error);
      throw new BadRequestException('Không thể gửi email, vui lòng thử lại.');
    }
  }

  // Xác thực mã OTP
  async verifyOtp(email: string, inputOtp: string): Promise<boolean> {
    const existingOtp = await this.otpRepository.findLatestOtp(email);
    
    if (!existingOtp) {
      throw new BadRequestException('OTP không hợp lệ hoặc đã hết hạn.');
    }

    const isValid = existingOtp.otp == inputOtp;

    if (isValid) {
      // Xoá OTP sau khi xác thực thành công
      await this.otpRepository.deleteOtp(email);
    }

    return isValid;
  }
}