import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from 'src/auth/auth.service';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      signOptions: { expiresIn: '120s' },
      secretOrKey: 'secretKey', // Use a more secure key in production
    });
  }

  async validate(payload: any) {
    return this.authService.validate(payload.email);
  }
}
