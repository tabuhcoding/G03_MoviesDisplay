// src/user/user.service.ts
import { Injectable, ConflictException, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from './user.repository';
import { User } from './schema/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserDto } from './dto/get-user.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService
  ) {}

  async register(createUserDto: CreateUserDto): Promise<{ token: string, user: User }> {
    const { username, email, password } = createUserDto;

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

  async handleGoogleUser(profile: any): Promise<{ token: string; user: User }> {
    const { googleId, email, fullName, avatar } = profile;
    let user = await this.userRepository.findByEmail(email);

    if (!user) {
      user = await this.userRepository.createGoogleUser({
        googleId,
        email,
        username: fullName,
        password: process.env.DEFAULT_PASSWORD,
        avatar,
      });
    }
    if (!user.googleId || !user.avatar) {
      await this.userRepository.updateGoogleUser(email, { googleId, avatar });
    }

    const payload = { email: user.email, username: user.username, avatar: avatar, sub: user._id };
    const token = this.jwtService.sign(payload);
    return { token, user };
  }
}
