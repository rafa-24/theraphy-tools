import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Patient } from '../model/entities/patient.entity';
import { Repository } from 'typeorm';
import { CreatePatientDto } from '../dto/create-patient.dto';
import { hashPassword } from 'src/common/helpers/hash-password';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(Patient)
        private  patientRepository: Repository<Patient>,
    ) {}

    async registerPatient(userDto: CreatePatientDto): Promise<{ success: boolean, err: boolean, message: string}> {
        try {
            const { patientName, paternalSurname, telephoneNumber, country, email, role, password } = userDto;
            const hashedPassword = await hashPassword(password);

            const newPatient = this.patientRepository.create({
                name: patientName,
                paternalSurname: paternalSurname,
                telephoneNumber: telephoneNumber,
                fkCountry: {patientId: country},
                email: email,
                fkRole: {rolId: role},
                password: hashedPassword
            });

            const savedPatient = await this.patientRepository.save(newPatient);
            return savedPatient ? { success: true, err: false, message: `User patient created successfully with id ${savedPatient.patientId}` } : { success: false, err: true, message: 'error occurred while creating patient user' };

        } catch (err) {
            console.error('Occurred error registerPatient', err);
            return { success: false, err: true, message: err };
        }
    }
}
