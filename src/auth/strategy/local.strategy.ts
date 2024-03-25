import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../services/auth.service';
import { JwtRefreshTokenStrategy } from './jwt-refresh-token.strategy';
import { LoginDto } from '../requests';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(JwtRefreshTokenStrategy.name);

  constructor(private readonly _authService: AuthService) {
    super({ identifierField: 'identifier' });
    this.logger.warn('LocalStrategy initialized');
  }

  async validate(data: LoginDto) {
    const user = await this._authService.validateLogin(data);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
