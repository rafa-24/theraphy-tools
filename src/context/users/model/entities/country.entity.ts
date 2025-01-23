import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Patient } from './patient.entity';
import { Therapist } from './therapist.entity';

@Entity()
export class Country {
  @PrimaryGeneratedColumn({name: 'country_id'})
  patientId: number;

  @Column({name:'country_name'})
  countryName: string;

  @OneToMany(() => Patient, (patient) => patient.fkCountry)
  patients: Patient[];

  @OneToMany(() => Therapist, (therapist) => therapist.fkCountry)
  therapist: Therapist[];
}