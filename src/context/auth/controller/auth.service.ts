import { Injectable } from '@nestjs/common';
import { UserService } from 'src/context/users/controller/user.service';
import { LoginDto } from '../dto/login.dto';
import { comparePassword } from 'src/common/helpers/compare-password';
import { JwtService } from '@nestjs/jwt';
import { LoginOutputInterface } from 'src/common/interface/output/login-output.interface';
import { CreateResource } from 'src/common/interface/create/response-create-resource.interface';
import { MailService } from 'src/context/mail/mail.service';
import { TherapistOutputInterface } from 'src/common/interface/output/therapist-output.interface';
import { PatientOutputInterface } from 'src/common/interface/output/patient-output.interface';
import { ResetPasswordDto } from '../dto/reset-password.dto.interface';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly mailService: MailService
    ) {}

    async signIn(data: LoginDto): Promise<LoginOutputInterface | CreateResource> {
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

    async sendPasswordReset(userEmail: string): Promise<CreateResource |  TherapistOutputInterface | PatientOutputInterface > {
        try {
            const user = await this.userService.searchUser(userEmail) as TherapistOutputInterface | PatientOutputInterface;
            if (!user)  return user;

            //actualizar codigo de verificacion
            const code: string = await this.mailService.sendPasswordReset(userEmail);
            const generateVerificationCode = await this.userService.updateVerificationCode(user,code);

            return (!generateVerificationCode.success) ? generateVerificationCode : generateVerificationCode;

        } catch (err) {
            return err;
        }
    }

    async resetPassword(resetPassDto: ResetPasswordDto): Promise<any> {
        try {

            const {email, codeVerification, pass} = resetPassDto;
            const user: any = await this.userService.searchUser(email);
            if (!user)  return user;

            // actualiza contraseña y actualiza
            const updatedPassword = await this.userService.resetPassword(user, codeVerification, pass);
            return  (!updatedPassword.success) ? updatedPassword : updatedPassword;
        } catch (error) {
            return error;
        }
    }




}
