import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './auth-login.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

/**décorateur Tag permettant de catégoriser les différentes route dans la doc API Swagger*/
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiBody({ type: LoginDto })
  async login(@Request() req) {
    console.log('//////', req.user);

    return this.authService.login(req.user);
  }
}
