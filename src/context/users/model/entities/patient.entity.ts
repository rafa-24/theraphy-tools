import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { Country } from './country.entity';
import { Role } from './role.entity';

@Entity()
export class Patient {
  @PrimaryGeneratedColumn({name: 'patient_id'})
  patientId: number;

  @Column({name:'patient_name'})
  name: string;

  @Column({name:'paternal_surname'})
  paternalSurname: string;

  @Column({name:'telephone_number'})
  telephoneNumber: string;

  @ManyToOne(() => Country, (country) => country.patients, { onDelete: 'SET NULL', nullable: true })
  fkCountry: Country;

  @Column({name:'email'})
  email: string;

  @ManyToOne(() => Role, (role) => role.patients, { onDelete: 'SET NULL', nullable: true })
  fkRole: Role;

  @Column({name:'password'})
  password: string;

  @Column({name:'code_verification', default: null})
  verificationCode: string;

  @Column({name:'is_valid_verification_code', default: null})
  isValidVerificationCode: boolean;

}