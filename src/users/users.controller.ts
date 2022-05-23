import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Inject,
  ParseIntPipe,
  InternalServerErrorException,
  LoggerService,
  Logger,
} from '@nestjs/common';
import { UsersService } from './users.service';
import {
  CreateUserDto,
  VerifyEmailDto,
  UserLoginDto,
} from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    @Inject(Logger) private readonly logger: LoggerService,
  ) {}

  @Post()
  async create(@Body() dto: CreateUserDto): Promise<void> {
    console.log(dto);
    const { name, email, password } = dto;
    this.printLoggerServiceLog(dto);

    await this.usersService.createUser(name, email, password);
  }

  private printLoggerServiceLog(dto) {
    try {
      throw new InternalServerErrorException('test');
    } catch (e) {
      this.logger.error('error: ' + JSON.stringify(dto), e.stack);
    }
    this.logger.warn('warn: ' + JSON.stringify(dto));
    this.logger.log('log: ' + JSON.stringify(dto));
    this.logger.verbose('verbose: ' + JSON.stringify(dto));
    this.logger.debug('debug: ' + JSON.stringify(dto));
  }
  @Post('/email-verify')
  verifyEmail(@Query() dto: VerifyEmailDto) {
    console.log(dto);
    return;
  }

  @Post('/login')
  verify(@Body() dto: UserLoginDto) {
    console.log(dto);
    return;
  }

  @Get('/:id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    console.log(id);
    return;
  }
}
