import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Patient } from './patient.entity';

@Entity()
export class Role {
  @PrimaryGeneratedColumn({name: 'role_id'})
  rolId: number;

  @Column({name:'role_name'})
  roleName: string;

  @OneToMany(() => Patient, (patient) => patient.fkRole)
  patients: Patient[];
}
