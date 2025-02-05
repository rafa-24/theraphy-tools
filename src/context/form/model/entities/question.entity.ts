import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { TherapeuticForm } from './therapeutic-form.entity';
import { Answer } from './answer.entity';

@Entity()
export class Question {
  @PrimaryGeneratedColumn({name: 'question_id'})
  questionId: number;

  @Column({name:'question_text'})
  text: string;

  @ManyToOne(() => TherapeuticForm, (therapeuticForm) => therapeuticForm.therapeuticFormId)
  fkTherapeuticForm: TherapeuticForm;

  @OneToMany(() => Answer, (answer) => answer.answerId)
  answer: Answer;

}