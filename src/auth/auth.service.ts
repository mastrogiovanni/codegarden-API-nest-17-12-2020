import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JWTService } from './jwt.service';
import { LoginDto } from './login.dto';

const dotenv = require('dotenv');
dotenv.config();

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JWTService,
    ) {}

    async validateLogin(loginDto: LoginDto) {
        let user = this.getUserByUsername(loginDto.username)
        if (!user)
            throw new HttpException('LOGIN.USER_NOT_FOUND', HttpStatus.NOT_FOUND);

        var isValidPass = user.password == loginDto.password
        
        if (isValidPass) {
            var accessToken = await this.jwtService.createToken(
                user.username
            );
            return { token: accessToken, user: user };
        } else {
            throw new HttpException('LOGIN.ERROR', HttpStatus.UNAUTHORIZED);
        }
    }

    getUserByUsername(username: string) {
        let users = {
            "michele": "pwd1",
            "andrea": "pwd2",
            "admin": "pwd3",
        }
        if (username in users) {
            return { username: username, password: users[username] }
        }
        return null        
    }
}
