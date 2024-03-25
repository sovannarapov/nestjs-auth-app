// import { Injectable } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
// import { pick } from 'lodash';
// import { User } from 'src/users/users.entity';

// @Injectable()
// export class AuthTokenService {
//   constructor(private readonly _jwtService: JwtService) {}

//   createAccessToken(member: User) {
//     // const data = {
//     //   type: 'member',
//     //   data: pick(member, ['id', 'email', 'memberOid', 'type', 'roles']),
//     // };

//     return this._jwtService.sign(member.id, data);
//   }

//   async revokeTokenForUser(key: string | Buffer) {
//     try {
//       await this._jwtService.call().destroy(key);
//     } catch {
//       return;
//     }

//     return true;
//   }

//   async purgeTokenForUser(id: number | string) {
//     try {
//       await this._jwtService.call().destroyMultiple(id);
//     } catch {
//       return;
//     }

//     return true;
//   }
// }
