import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { EmailService } from '../email/email.service';
import { EmailService2 } from '../email2/email2.service';
@Module({
  controllers: [UsersController],
  providers: [UsersService, EmailService, EmailService2],
})
export class UsersModule {}
