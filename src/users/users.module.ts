import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { EmailService } from '../email/email.service';
import { ChildService, TestServiceA } from '../email2/email2.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
@Module({
  //해당 모듈에서 사용할 저장소 등록
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UsersController],
  providers: [UsersService, EmailService, ChildService, TestServiceA],
})
export class UsersModule {}
