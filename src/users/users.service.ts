import {
  Injectable,
  Post,
  Query,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Connection } from 'typeorm';
import { ulid } from 'ulid';
import { EmailService } from '../email/email.service';
import { ChildService } from '../email2/email2.service';
import { UserEntity } from './entities/user.entity';
import * as uuid from 'uuid';
import { VerifyEmailDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    private emailService: EmailService,
    private emailService2: ChildService,
    //리포지토리는 저장소라는 의미 !
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    private connection: Connection,
  ) {}

  async createUser(name: string, email: string, password: string) {
    const userExist = await this.checkUserExists(email);
    if (userExist) {
      throw new UnprocessableEntityException(
        '해당 이메일로는 가입할 수 없습니다.',
      );
    }

    const signupVerifyToken = uuid.v1();
    await this.saveUser(name, email, password, signupVerifyToken);
    await this.sendMemberJoinEmail(email, signupVerifyToken);
  }

  private async checkUserExists(emailAddress: string): Promise<boolean> {
    const user = await this.usersRepository.findOne({ email: emailAddress });

    return user !== undefined;
  }
  private async saveUser(
    name: string,
    email: string,
    password: string,
    signupVerifyToken: string,
  ) {
    const user = new UserEntity();
    //랜덤한 스트링 생성 !
    user.id = ulid();
    user.name = name;
    user.email = email;
    user.password = password;
    user.signupVerifyToken = signupVerifyToken;
    await this.usersRepository.save(user);
  }
  private async saveUserUsingQueryRunner(
    name: string,
    email: string,
    password: string,
    signupVerifyToken: string,
  ) {
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const user = new UserEntity();
      user.id = ulid();
      user.name = name;
      user.email = email;
      user.password = password;
      user.signupVerifyToken = signupVerifyToken;

      await queryRunner.manager.save(user);

      // throw new InternalServerErrorException(); // 일부러 에러를 발생시켜 본다

      await queryRunner.commitTransaction();
    } catch (e) {
      // 에러가 발생하면 롤백
      await queryRunner.rollbackTransaction();
    } finally {
      // 직접 생성한 QueryRunner는 해제시켜 주어야 함
      await queryRunner.release();
    }
  }

  private async sendMemberJoinEmail(email: string, signupVerifyToken: string) {
    const tmp = await this.emailService.sendMemberJoinVerification(
      email,
      signupVerifyToken,
    );
    const tmp2 = await this.emailService2.testHello();
    console.log(tmp);
    console.log(tmp2);
  }
}
