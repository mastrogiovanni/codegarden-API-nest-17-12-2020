import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ResponseSuccess, ResponseError } from '../common/dto/response.dto';
import { IResponse } from '../common/interfaces/response.interface';
import { AuthService } from './auth.service';
import { LoginDto } from './login.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @Post('login')
    public async login(@Body() loginDto: LoginDto): Promise<IResponse> {
      try {
        var response = await this.authService.validateLogin(loginDto);
        return new ResponseSuccess("LOGIN.SUCCESS", response);
      } catch(error) {
        return new ResponseError("LOGIN.ERROR", error);
      }
    }

}
