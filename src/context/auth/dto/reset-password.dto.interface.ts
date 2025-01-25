import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class ResetPasswordDto {

    @IsEmail()
    @IsNotEmpty()
    email: string;


    @IsString()
    @IsNotEmpty()
    codeVerification: string;

    @IsString()
    @IsNotEmpty()
    pass: string;

}