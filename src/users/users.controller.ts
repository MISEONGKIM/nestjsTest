import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import {
  CreateUserDto,
  VerifyEmailDto,
  UserLoginDto,
} from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() dto: CreateUserDto): Promise<void> {
    console.log(dto);
    const { name, email, password } = dto;
    await this.usersService.createUser(name, email, password);
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
  findOne(@Param('id') id: string) {
    console.log(id);
    return;
  }
}
