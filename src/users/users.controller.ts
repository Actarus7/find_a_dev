import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UseInterceptors(ClassSerializerInterceptor)
  async create(@Body() createUserDto: CreateUserDto) {
    const saltOrRounds = 10;

    const hash = await bcrypt.hash(createUserDto.password, saltOrRounds);

    const user = await this.usersService.create(createUserDto, hash);

    return user;
  }
}
