import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { validatePassword } from '../utils/password.validator';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(
    @Body('email') email: string,
    @Body('name') name: string,
    @Body('password') password: string,
  ) {
    const validationErrors = validatePassword(password);

    if (validationErrors.length > 0) {
      throw new BadRequestException(validationErrors);
    }

    return this.authService.signUp(email, name, password);
  }

  @Post('signin')
  async signIn(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return this.authService.login(user);
  }
}
