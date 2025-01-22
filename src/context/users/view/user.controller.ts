import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from '../controller/user.service';
import { CreatePatientDto } from '../dto/create-patient.dto';

@Controller('user')
export class UserController {

    constructor(
        private readonly userService: UserService
    ) {}

    @Post('patient/registration')
    async register(
        @Body() patientBody: CreatePatientDto
    ) {
        return await this.userService.registerPatient(patientBody);
    }

}
