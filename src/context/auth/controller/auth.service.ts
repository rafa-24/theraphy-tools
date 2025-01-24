import { Injectable } from '@nestjs/common';
import { UserService } from 'src/context/users/controller/user.service';
import { LoginDto } from '../dto/login.dto';
import { comparePassword } from 'src/common/helpers/compare-password';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) {}


    async signIn(data: LoginDto): Promise<any> { //TODO:  Corregir interfaz
        try {
            const user: any = await this.userService.searchUser(data.email);
            if (!user)  return user;

            const isPasswordCorrect = await comparePassword(data.password, user.password);
            if (!isPasswordCorrect) return  { success: false, status: 401, message: 'Credentials user invalid' };

            const { password, ...result } = user;
            const payload = {
                sub: result.patientId | result.therapistId,
                email: result.email,
                role: result.fkRole,
                country: result.fkCountry
            };
            const accessToken = await this.jwtService.signAsync(payload);

            return {
                success: true,
                status: 200,
                message: 'Login successful',
                accessToken
            }

        } catch (err) {
            console.error('err',err);
            return err;
        }
    }
}
