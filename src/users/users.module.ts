import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { EmailService } from '../email/email.service';
import { ChildService, TestServiceA } from '../email2/email2.service';
@Module({
  controllers: [UsersController],
  providers: [UsersService, EmailService, ChildService, TestServiceA],
})
export class UsersModule {}
