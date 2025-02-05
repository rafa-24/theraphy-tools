import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from '../controller/user.service';
import { CreatePatientDto } from '../dto/create-patient.dto';
import { CreateTherapistDto } from '../dto/create-therapist.dto';

@Controller('user')
export class UserController {

    constructor(
        private readonly userService: UserService
    ) {}

    @Post('patient/registration')
    async registerPatient(
        @Body() patientBody: CreatePatientDto
    ) {
        return await this.userService.registerPatient(patientBody);
    }

    @Post('therapist/registration')
    async registerTherapist(
        @Body() therapistBody: CreateTherapistDto
    ) {
        return await this.userService.registerTherapist(therapistBody);
    }

    @Get('countries')
    async listCountries() {
        return await this.userService.getListCountries();
    }

}
