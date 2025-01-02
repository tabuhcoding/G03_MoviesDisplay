import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Otp, OtpDocument } from './schema/otp.schema';

@Injectable()
export class OtpRepository {
  constructor(@InjectModel(Otp.name) private otpModel: Model<OtpDocument>) {}

  async createOtp(email: string, otp: string, expiresAt: Date): Promise<Otp> {
    const newOtp = new this.otpModel({
      email,
      otp,
      expiresAt,
      remainingAttempts: 5,
    });
    return newOtp.save();
  }

  async saveOtp(email: string, otp: string, expiresAt: Date): Promise<Otp> {
    return this.otpModel.create({
      email,
      otp,
      expiresAt,
      remainingAttempts: 5,
    });
  }

  async findOtpByEmail(email: string): Promise<Otp | null> {
    return this.otpModel.findOne({ email }).exec();
  }

  async findLatestOtp(email: string): Promise<Otp | null> {
    return this.otpModel.findOne({ email }).sort({ createdAt: -1 }).exec();
  }

  async deleteOtp(email: string): Promise<void> {
    await this.otpModel.deleteMany({ email }).exec();
  }
}