import { Body, Controller, Post } from '@nestjs/common';
import { FormService } from '../controller/form.service';
import { TherapeuticFormDto } from '../dto/therapeutic-form-payload.dto';

@Controller('form')
export class FormController {
    constructor(
        private readonly therapeuticForm: FormService
    ) {}

    @Post()
    async createTherapeuticForm(@Body() data: TherapeuticFormDto) {
        return await this.therapeuticForm.createTherapeuticForm(data,1);
    }
}
