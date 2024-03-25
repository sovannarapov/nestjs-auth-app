import { ApiSecurity } from '@nestjs/swagger';

@ApiSecurity('apiKey')
export abstract class AbstractController {
  public service: any;
}
