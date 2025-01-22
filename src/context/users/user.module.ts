import { Module } from '@nestjs/common';
import { UserService } from './controller/user.service';
import { UserController } from './view/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from './model/entities/patient.entity';
import { Therapist } from './model/entities/therapist.entity';
import { PatientSubscriber } from './subscribers/patient.suscriber';
import { Country } from './model/entities/country.entity';
import { Role } from './model/entities/role.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([Patient,Therapist, Country, Role])
  ],
  providers: [UserService, PatientSubscriber],
  controllers: [UserController]
})
export class UserModule {}
