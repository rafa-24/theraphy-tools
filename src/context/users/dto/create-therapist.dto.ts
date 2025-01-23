import { IsNotEmpty, IsNumber, isString, IsString, Matches, MinLength } from "class-validator";

export class CreateTherapistDto {

    @IsNotEmpty()
    @IsString()
    name: string;

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
    universityDegree: string;

    @IsNotEmpty()
    @IsNumber()
    workExperience: number;

    @IsNotEmpty()
    @IsString()
    password: string;
}