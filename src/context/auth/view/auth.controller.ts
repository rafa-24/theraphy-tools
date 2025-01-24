import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../controller/auth.service';
import { LoginDto } from '../dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/login')
    async signIn(@Body() data: LoginDto) {
        return await this.authService.signIn(data);
    }
}
