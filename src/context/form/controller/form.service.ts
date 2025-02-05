import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TherapeuticForm } from '../model/entities/therapeutic-form.entity';
import { Repository } from 'typeorm';
import { TherapeuticFormCreate } from '../interface/therapeutic-form-create.interface';
import { Therapist } from 'src/context/users/model/entities/therapist.entity';

@Injectable()
export class FormService {
    constructor(
        @InjectRepository(TherapeuticForm)
        private formRepo: Repository<TherapeuticForm>,
        @InjectRepository(Therapist)
        private therapistRepo: Repository<Therapist>,
    ) {}

    async createTherapeuticForm(data: TherapeuticFormCreate, therapistId: number ):Promise<any> {
        try {
            const {name, description} = data;

            // validate therapist
            const therapist = await this.therapistRepo.findOne({where: {therapistId}});
            if (!therapist) return { success: false, status: 401, message: 'Unauthorized' };

            const newForm = new TherapeuticForm();
            newForm.therapeuticFormName = name;
            newForm.therapeuticFormDescription = description;
            newForm.fkTherapist = therapist;

            const saveForm = await this.formRepo.save(newForm);
            console.log('saveForm', saveForm);

            if (Object.keys(saveForm).length === 0) return { success: false, status: 500, message: 'error when creating a therapeutic form' };
            return { success: true, status: 201, message: `Therapeutic form create successfully with id ${saveForm.therapeuticFormId}` };

        } catch (error) {
            console.error('error', error);
        }
    }

}
