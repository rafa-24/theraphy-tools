import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Patient } from '../model/entities/patient.entity';
import { Repository } from 'typeorm';
import { CreatePatientDto } from '../dto/create-patient.dto';
import { hashPassword } from 'src/common/helpers/hash-password';
import { CreateTherapistDto } from '../dto/create-therapist.dto';
import { Therapist } from '../model/entities/therapist.entity';
import { validatePassword } from 'src/common/helpers/validate-password';
import { CreateResource } from 'src/common/interface/create/response-create-resource.interface';
import { validateEmail } from 'src/common/helpers/validate-email';
import { createExceptionError } from 'src/common/exceptions/create-exception-error';
import { PatientOutputInterface } from 'src/common/interface/output/patient-output.interface';
import { TherapistOutputInterface } from 'src/common/interface/output/therapist-output.interface';
import { Country } from '../model/entities/country.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(Patient)
        private  patientRepository: Repository<Patient>,
        @InjectRepository(Therapist)
        private  therapistRepository: Repository<Therapist>,
        @InjectRepository(Country)
        private  countryRepository: Repository<Country>,
    ) {}

    async registerPatient(userDto: CreatePatientDto): Promise<{ success: boolean, status?: number, message: string}> {
        try {
            const { patientName, paternalSurname, telephoneNumber, country, email, password } = userDto;

            const isValidEmail = validateEmail(email) as CreateResource;
            if (!isValidEmail.success) return isValidEmail;

            const response = validatePassword(password) as CreateResource;
            if (!response.success) return response;
            const hashedPassword = await hashPassword(password);

            const newPatient = this.patientRepository.create({
                name: patientName,
                paternalSurname: paternalSurname,
                telephoneNumber: telephoneNumber,
                fkCountry: {patientId: country},
                email: email,
                fkRole: {rolId: 2},
                password: hashedPassword
            });

            const savedPatient = await this.patientRepository.save(newPatient);
            return savedPatient ? { success: true, status: 201, message: `User patient created successfully with id ${savedPatient.patientId}` } : { success: false, status: 500, message: 'error occurred while creating patient user' };

        } catch (err) {
            console.error('Occurred error registerPatient', err);
            return err;
        }
    }


    async registerTherapist(therapistDto: CreateTherapistDto): Promise<{ success: boolean, status?: number, message: string}> {
        try {
            const { name, paternalSurname, telephoneNumber, country, email, universityDegree, workExperience, password } = therapistDto;

            const isValidEmail = validateEmail(email) as CreateResource;
            if (!isValidEmail.success) return isValidEmail;

            const response = validatePassword(password) as CreateResource;
            if (!response.success) return response;
            const hashedPassword = await hashPassword(password);

            const newTherapist = this.therapistRepository.create({
                name,
                paternalSurname,
                telephoneNumber,
                fkCountry: {patientId: country},
                email,
                fkRole: {rolId: 3},
                universityDegree,
                workExperience,
                password: hashedPassword
            });

            const savedTherapist = await this.therapistRepository.save(newTherapist);
            return savedTherapist ?  { success: true, status: 201, message: `User therapist created successfully with id ${savedTherapist.therapistId}` } : { success: false, status: 500, message: 'error occurred while creating therapist user' };

        } catch (err) {
            console.log(err);
            return err;
        }
    }

    async searchUser(userEmail: string): Promise<PatientOutputInterface | TherapistOutputInterface | CreateResource > {
        try {
            const userPatient  = await this.patientRepository.findOne({relations: ['fkCountry', 'fkRole'], where: {email: userEmail}});
            const userTherapist  = await this.therapistRepository.findOne({ relations: ['fkCountry', 'fkRole'], where: {email: userEmail}});

            if (userPatient && !userTherapist) return  userPatient;
            if (userTherapist && !userPatient) return userTherapist;
            if (!userPatient && !userTherapist) return {success: false, message: 'This user does not exist'};

        } catch (err) {
            createExceptionError(err);
        }
    }

    async updateVerificationCode(
        user: PatientOutputInterface | TherapistOutputInterface,
        code: string
    ): Promise<CreateResource> {
        try {
            if (user.fkRole.roleName === 'patient') {
                const updateCode = await this.patientRepository.update({email: user.email}, {
                    verificationCode: code,
                    isValidVerificationCode: false
                });
                return (updateCode.affected > 0) ? { success:true, status: 204, message: `code was generated reset password to patient user with patient ${user.name} ${user.paternalSurname}`} :
                { success:false, status: 400, message:'Error when generating password reset code user patient.'};
            }

            if (user.fkRole.roleName === 'therapist') {
                const updateCode = await this.therapistRepository.update({email: user.email}, {
                    verificationCode: code,
                    isValidVerificationCode: false
                });
                return (updateCode.affected > 0) ? { success:true, status: 204, message: `code was generated reset password to patient user with therapist id ${user.name}  ${user.paternalSurname}` } :
                { success:false, status: 400, message:'Error when generating password reset code user therapist.'};
            }
        } catch (error) {
            return error;
        }
    }

    async resetPassword(
        user: PatientOutputInterface | TherapistOutputInterface,
        code: string,
        pass: string
    ): Promise<any> {
        try {
            if (user.fkRole.roleName === 'patient') {
                if (user.verificationCode === code) {
                    const hashedPassword = await hashPassword(pass);
                    const updateInformation = await this.patientRepository.update({email: user.email}, {
                        password: hashedPassword,
                        verificationCode: null,
                        isValidVerificationCode: true
                    });

                    return updateInformation.affected > 0 ? {success: true, status: 204, message: `password updated user with patient ${user.name} ${user.paternalSurname}` } :
                    {success: false, status:400, message: 'patient user could not update password' };
                }
            }
            if (user.fkRole.roleName === 'therapist') {
                if (user.verificationCode === code) {
                    const hashedPassword = await hashPassword(pass);
                    const updateInformation = await this.therapistRepository.update({email: user.email}, {
                        password: hashedPassword,
                        verificationCode: null,
                        isValidVerificationCode: true
                    });

                    return updateInformation.affected > 0 ? {success: true, status: 204, message: `password updated user with therapist ${user.name} ${user.paternalSurname}` } :
                    {success: false, status:400, message: 'patient user could not update password' };
                }
            }
        } catch (error) {
            return error;
        }
    }

    async getListCountries() {
        try {
            const listCountries = await this.countryRepository.find();
            return listCountries;
        } catch (error) {
            return error;
        }

    }


}
