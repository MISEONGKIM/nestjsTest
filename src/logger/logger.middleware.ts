import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
//미들웨어는 함수로 작성하거나 NestMiddleware 인터페이스를 구현한 클래스로 작성
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Request');
    next();
  }
}
