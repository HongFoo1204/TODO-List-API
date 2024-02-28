import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserAuthDto } from './dto/userAuth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() userAuthDto: UserAuthDto) {
    return this.authService.signIn(userAuthDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signUp')
  signUp(@Body() userAuthDto: UserAuthDto) {
    return this.authService.signUp(userAuthDto);
  }
}
