import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LoginDto } from '../requests';
import { POST_DESCRIPTION, RESOURCE } from '../auth.constant';
import { ApiOkResponse } from '@nestjs/swagger';

@Controller(RESOURCE)
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: LoginDto,
    description: POST_DESCRIPTION.okResponse,
  })
  async login(@Body() data: LoginDto) {
    const user = await this._authService.validateLogin(data);
    const token = await this._authService.login(user);

    return { user, token };
  }
}
