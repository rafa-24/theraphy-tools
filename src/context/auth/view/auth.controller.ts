import { Body, Controller, Post, Put } from '@nestjs/common';
import { AuthService } from '../controller/auth.service';
import { LoginDto } from '../dto/login.dto';
import { ResetPasswordDto } from '../dto/reset-password.dto.interface';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/login')
    async signIn(@Body() data: LoginDto) {
        return await this.authService.signIn(data);
    }

    @Post('/reset-password')
    async sendPasswordReset(@Body('userEmail') email: string ) {
        return this.authService.sendPasswordReset(email);
    }

    @Put('/change-password')
    async changePassword(@Body() data: ResetPasswordDto ) {
        return await this.authService.resetPassword(data);
    }
}
