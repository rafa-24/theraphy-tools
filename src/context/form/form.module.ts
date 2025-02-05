import { Module } from '@nestjs/common';
import { FormController } from './view/form.controller';
import { FormService } from './controller/form.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TherapeuticForm } from './model/entities/therapeutic-form.entity';
import { Answer } from './model/entities/answer.entity';
import { Question } from './model/entities/question.entity';
import { Therapist } from '../users/model/entities/therapist.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([TherapeuticForm, Answer, Question, Therapist])
  ],
  providers: [FormService],
  controllers: [FormController]
})
export class FormModule {}
