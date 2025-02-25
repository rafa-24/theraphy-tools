import { IsNotEmpty, IsNumber, IsString, Matches, MinLength } from "class-validator";

export class CreatePatientDto {

    @IsNotEmpty()
    @IsString()
    patientName: string;

    @IsNotEmpty()
    @IsString()
    paternalSurname: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(10)
    telephoneNumber: string;

    @IsNotEmpty()
    @IsNumber()
    country: number;

    @IsNotEmpty()
    @IsString()
    @Matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,3}$/g)
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    password: string;
}