import { Therapist } from 'src/context/users/model/entities/therapist.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Question } from './question.entity';


@Entity()
export class TherapeuticForm {
  @PrimaryGeneratedColumn({name: 'therapeutic_form_id'})
  therapeuticFormId: number;

  @Column({name:'therapeutic_form_name'})
  therapeuticFormName: string;

  @Column({name:'therapeutic_form_description'})
  therapeuticFormDescription: string;

  //TODO: the form have many therapist
  @ManyToOne(() => Therapist, (therapist) => therapist.form)
  fkTherapist: Therapist;

  @OneToMany(() => Question, (question) => question.fkTherapeuticForm)
  question: Question;

}