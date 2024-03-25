import { IsNotEmpty } from 'class-validator';

export class RegisterUserDto {
  @IsNotEmpty()
  readonly identifier: string;

  @IsNotEmpty()
  readonly password: string;
}
