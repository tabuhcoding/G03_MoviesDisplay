import { Request } from 'express';

declare module 'express' {
  export interface Request {
    user?: any; // Hoặc bạn có thể định nghĩa cụ thể kiểu của `user` nếu muốn
  }
}