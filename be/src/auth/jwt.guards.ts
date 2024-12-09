import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    
    // Lấy token từ cookie
    const token = request.headers.authorization?.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('Authentication token is missing');
    }

    // Gắn token vào headers để Passport xử lý
    request.headers.authorization = `Bearer ${token}`;
    return super.canActivate(context);
  }
}
