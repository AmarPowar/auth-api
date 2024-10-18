import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../jwt/jwt-auth.guard';
@Controller('auth')
export class ProtectedController {
  @UseGuards(JwtAuthGuard)
  @Get('home')
  getProtectedResource() {
    return { message: 'Welcome to the application.' };
  }
}
