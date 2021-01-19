import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JWTService } from './jwt.service';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from './auth.service';

const dotenv = require('dotenv');
dotenv.config()

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  constructor(
    private readonly jwtService: JWTService,
    private readonly authService: AuthService
  ) {
    super(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        passReqToCallback: true,
        secretOrKey: process.env.JWT_SECRET,
      }
    );
  }

  public async validate(payload: any, req: any, done: Function) {
    let user = this.authService.getUserByUsername(req.username)
    if (!user) {
      return done(new UnauthorizedException(), false);
    }
    else {
      done(null, user);
    }
  }
}
