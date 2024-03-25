import { ApiProperty } from '@nestjs/swagger';

export class LoginResDto {
  @ApiProperty()
  user: any;

  @ApiProperty()
  token: string;
}
