import { Injectable } from '@nestjs/common';
import { EmailService } from '../email/email.service';
import { EmailService2 } from '../email2/email2.service';
@Injectable()
export class UsersService {
  constructor(
    private emailService: EmailService,
    private emailService2: EmailService2,
  ) {}

  async createUser(name: string, email: string, password: string) {
    await this.checkUserExists(email);

    const signupVerifyToken = 'aaaaa';

    await this.sendMemberJoinEmail(email, signupVerifyToken);
  }

  private checkUserExists(email: string) {
    return false; // TODO: DB 연동 후 구현
  }

  saveUser() {
    return 'saveUser'; // TODO: DB 연동 후 구현
  }

  private async sendMemberJoinEmail(email: string, signupVerifyToken: string) {
    const tmp = await this.emailService.sendMemberJoinVerification(
      email,
      signupVerifyToken,
    );
    const tmp2 = await this.emailService2.sendMemberJoinVerification(
      email,
      signupVerifyToken,
    );
    console.log(tmp);
    console.log(tmp2);
  }
}
