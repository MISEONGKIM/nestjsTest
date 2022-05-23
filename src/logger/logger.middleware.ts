import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

//미들웨어는 함수로 작성하거나 NestMiddleware 인터페이스를 구현한 클래스로 작성
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Request');
    next();
  }
}

//프로바이더 주입이 필요한 경우 Injectable달아줘랑
@Injectable()
export class Logger2Middleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    next();
  }
}

export function logger3(req: Request, res: Response, next: NextFunction) {
  console.log(`Request3...`);
  next();
}
