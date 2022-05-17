import { Inject, Injectable } from '@nestjs/common';
import { EmailService } from './email/email.service';
@Injectable()
export class AppService {
  constructor(@Inject('EmailService') private emailService: EmailService) {}
  getHello(): string {
    const tmp = this.emailService.sendMemberJoinVerification(
      'email',
      'signupVerifyToken',
    );
    console.log(tmp);
    return 'Hello dfdfdfd!';
  }
}
