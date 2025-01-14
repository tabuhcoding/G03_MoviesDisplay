// src/user/user.service.ts
import { Injectable, ConflictException, InternalServerErrorException, UnauthorizedException, BadRequestException  } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from './user.repository';
import { User } from '../schema/user.schema';
import { OtpService } from '../otp/otp.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { GetUserDto } from '../dto/get-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { ResetPasswordDto } from '../dto/reset-password.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly otpService: OtpService,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<{ token: string, user: User }> {
    const { username, email, password, confirmPassword } = createUserDto;

    if (password !== confirmPassword) {
      throw new BadRequestException('Mật khẩu xác nhận không khớp');
    }

    const existingUser = await this.userRepository.findByUsernameOrEmail(username, email);
    if (existingUser) {
      throw new ConflictException('Username or email already exists');
    }

    try {
      const hashedPassword = await this.userRepository.hashPassword(password);
      const newUser = await this.userRepository.createUser({
        username,
        email,
        password: hashedPassword,
        avatar: "",
        googleId: null,
      });
      
      const payload = { username: newUser.username, email: newUser.email, avatar: newUser.avatar, sub: newUser._id };
      const token = this.jwtService.sign(payload);
    
      return { token, user: newUser };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Failed to register user');
    }    
  }

  async login(getUserDto: GetUserDto): Promise<{ token: string; user: User }> {
    const { email, password } = getUserDto;
  
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }
  
    const isPasswordValid = await this.userRepository.comparePassword(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }
  
    const payload = { username: user.username, email: user.email, avatar: user.avatar, sub: user._id };
    const token = this.jwtService.sign(payload);
  
    return { token, user };
  }

  async getUserByEmail(email: string): Promise<{ expiresAt: Date; remainingAttempts: number }> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new BadRequestException('Không tìm thấy tài khoản với email này');
    }
    
    // Gửi OTP nếu tìm thấy email
    return this.otpService.sendOtpMail(email);
  }  

  async sendOTP(email: string): Promise<{ expiresAt: Date; remainingAttempts: number }> {
    return this.otpService.sendOtpMail(email);
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) : Promise<{ message: string }> {
    const { email, newPassword } = resetPasswordDto;

    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new BadRequestException('Không tìm thấy tài khoản với email này');
    }

    await this.userRepository.updatePassword(email, newPassword);

    return { message: 'Mật khẩu đã được cập nhật thành công.' };
  }

  async handleGoogleUser(profile: any): Promise<{ token: string; user: User }> {
    try{
      const { id, email, name, picture } = profile;
      let user = await this.userRepository.findByEmail(email);
      if (!user) {
        user = await this.userRepository.createGoogleUser({
          googleId: id,
          email,
          username: name,
          password: process.env.DEFAULT_PASSWORD,
          avatar:picture,
        });
      }
      if (!user.googleId || !user.avatar) {
        await this.userRepository.updateGoogleUser(email, { googleId: id, avatar: picture });
      }

      const payload = { email: user.email, username: user.username, avatar: picture, sub: user._id };
      const token = this.jwtService.sign(payload);
      return { token, user };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Failed to login with Google');
    }
  }

  async updateProfile(user: User, updateUserDto: UpdateUserDto): Promise<User> {
    const updatedUser = await this.userRepository.updateUser(user.email, updateUserDto);
    return updatedUser;
  }

  async updateAvatar(email: string, file: string): Promise<{ token: string; user: User }> {
    const updatedUser = await this.userRepository.updateAvatar(email, file);
    const payload = { email: updatedUser.email, username: updatedUser.username, avatar: updatedUser.avatar, sub: updatedUser._id };
    const token = this.jwtService.sign(payload);
    return { token, user: updatedUser };
  }
}
