import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { Country } from './country.entity';
import { Role } from './role.entity';
import { IsEmail } from 'class-validator';

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


  @ManyToOne(() => Country, (country) => country.therapist, { onDelete: 'SET NULL', nullable: true })
  fkCountry: Country;

  @Column({name:'email'})
  @IsEmail()
  email: string;

  @ManyToOne(() => Role, (role) => role.therapist, { onDelete: 'SET NULL', nullable: true })
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