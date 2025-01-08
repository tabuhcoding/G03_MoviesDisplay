// src/user/user.repository.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from '../schema/user.schema';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name, 'auth') private userModel: Model<User>) {}

  async findByUsernameOrEmail(username: string, email: string): Promise<User | null> {
    return this.userModel.findOne({ $or: [{ email }, { username }] }).exec();
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async createUser(userData: Partial<User>): Promise<User> {
    return this.userModel.create(userData);
  }

  async createGoogleUser(userData: Partial<User>): Promise<User> {
    const newUser = new this.userModel(userData);
    return newUser.save();
  }

  async updateGoogleUser(email: string, updates: Partial<User>): Promise<void> {
    await this.userModel.updateOne({ email }, updates);
  }

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async comparePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }

  async updateUser(userEmail: string, updates: Partial<User>): Promise<User> {
    return this.userModel.findOneAndUpdate({ email: userEmail }, updates, { new: true }).exec();
  }

  async updateAvatar(userEmail: string, file: string): Promise<User> {
    return this.userModel.findOneAndUpdate({ email: userEmail }, { avatar: file }, { new: true }).exec();
  }

  async updatePassword(email: string, newPassword: string): Promise<void> {
    const hashedPassword = await this.hashPassword(newPassword);
    await this.userModel.findOneAndUpdate(
      { email },
      { password: hashedPassword },
      { new: true }
    ).exec();
  }
}
