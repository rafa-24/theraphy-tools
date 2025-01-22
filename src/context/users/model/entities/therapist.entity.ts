import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { Country } from './country.entity';
import { Role } from './role.entity';

@Entity()
export class Therapist {
  @PrimaryGeneratedColumn({name: 'therapist_id'})
  therapistId: number;

  @Column({name:'therapist_name'})
  name: string;

  @Column({name:'paternal_surname'})
  paternalSurname: string;

  @Column({name:'telephone_number'})
  telephoneNumber: string;

  @OneToOne(() => Country)
  @JoinColumn()
  fkCountry: Country;

  @Column({name:'email'})
  email: string;

  @OneToOne(() => Role)
  @JoinColumn()
  fkRole: Role;

  @Column({name:'university_degree'})
  universityDegree: string;

  @Column({name:'work_experience'})
  workExperience: number;

  @Column({name:'password'})
  password: string;

  @Column({name:'code_verification'})
  verificationCode: string;

  @Column({name:'is_valid_verification_code'})
  isValidVerificationCode: boolean;
}