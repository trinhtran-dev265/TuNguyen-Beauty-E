import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './user.service';
import { UpdateStatusDto } from './dto/update-status.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('create')
  async create(
    @Body()
    body: CreateUserDto,
  ) {
    return this.usersService.createUser(body);
  }

  @Get()
  async getUsers() {
    return this.usersService.getUsers();
  }

  @Patch(':uid')
  async updateUser(
    @Param('uid')
    uid: string,

    @Body()
    body: UpdateUserDto,
  ) {
    return this.usersService.updateUser(uid, body);
  }

  @Patch(':uid/status')
  async updateStatus(
    @Param('uid')
    uid: string,

    @Body()
    body: UpdateStatusDto,
  ) {
    return this.usersService.updateStatus(uid, body.disabled);
  }

  @Delete(':uid')
  async delete(
    @Param('uid')
    uid: string,
  ) {
    return this.usersService.deleteUser(uid);
  }
}
