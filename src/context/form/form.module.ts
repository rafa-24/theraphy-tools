import { Module } from '@nestjs/common';
import { FormController } from './view/form.controller';
import { FormService } from './controller/form.service';

@Module({
  providers: [FormService],
  controllers: [FormController]
})
export class FormModule {}
