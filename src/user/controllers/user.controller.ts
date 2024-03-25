import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RESOURCE } from '../user.constant';
import { AbstractController } from 'libs/core/src';
import { RegisterUserDto, UpdateUserDto } from '../requests';

@UseGuards(AuthGuard)
@Controller(RESOURCE)
export class UserController extends AbstractController {
  constructor(private readonly userService: UserService) {
    super();
  }

  @Get()
  getUsers() {
    return this.userService.getUsers();
  }

  @Get(':id')
  getUser(@Param('id') id: number) {
    return this.userService.getUserById(id);
  }

  @Post('register')
  async registerUser(@Body() registerUserDto: RegisterUserDto) {
    return this.userService.createUser(registerUserDto);
  }

  @Patch()
  updateUser(@Body() userDto: UpdateUserDto) {
    return this.userService.updateUser(userDto);
  }
}
