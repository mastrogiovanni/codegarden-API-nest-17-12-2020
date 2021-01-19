import { Controller, Get, UseGuards, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LoggingInterceptor } from './common/interceptor/logging.interceptor';

// @ApiBearerAuth()
@Controller('/')
// @ApiTags('Hello World')
// @UseGuards(JwtAuthGuard)
// @UseInterceptors(LoggingInterceptor)
export class AppController {

  constructor(
    private readonly appService: AppService
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
