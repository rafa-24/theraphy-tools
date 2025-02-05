import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { TherapeuticForm } from './therapeutic-form.entity';
import { Question } from './question.entity';

@Entity()
export class Answer {
  @PrimaryGeneratedColumn({name: 'answer_id'})
  answerId: number;

  @Column({name:'answer_text'})
  answerText: string;

  @ManyToOne(() => Question, (question) => question.questionId)
  question: Question;

}