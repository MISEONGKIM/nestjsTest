import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './logger/logger.middleware';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'test',
      database: 'test',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      //서비스 구동시 소스코드 기반으로 데이터베이스 스키마를 동기화 할지 여부, 로컬환경에서는 구동할때는 개발의 편의를 위해 true로 합니다.
      //synchronize 옵션을 true로 하면 서비스가 실행되고 데이터베이스가 연결될 때 항상 데이터베이스가 초기화 되므로 절대 프로덕션에는 true로 하면안대
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})

//미들웨어를 모듈에 포함시키기 위해선 해당 모듈은 NestModule인터페이스 구현해야함.
export class AppModule implements NestModule {
  //미들웨어 설정
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggerMiddleware).forRoutes('/users');
  }
}
