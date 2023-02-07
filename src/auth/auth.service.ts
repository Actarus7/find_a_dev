import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(pseudo: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByPseudo(pseudo);

    const isMatch = await bcrypt.compare(pass, user.password);

    if (isMatch) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { pseudo: user.pseudo, sub: user.id };
    console.log(payload);

    return {
      statusCode: 200,
      message: 'Connection réussie',
      data: {
        access_token: this.jwtService.sign(payload),
      },
    };
  }
}
