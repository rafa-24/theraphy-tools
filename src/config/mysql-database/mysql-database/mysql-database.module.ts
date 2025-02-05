import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Answer } from 'src/context/form/model/entities/answer.entity';
import { Question } from 'src/context/form/model/entities/question.entity';
import { TherapeuticForm } from 'src/context/form/model/entities/therapeutic-form.entity';
import { Country } from 'src/context/users/model/entities/country.entity';
import { Patient } from 'src/context/users/model/entities/patient.entity';
import { Role } from 'src/context/users/model/entities/role.entity';
import { Therapist } from 'src/context/users/model/entities/therapist.entity';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            database: 'therapy',
            password: '12345678',
            entities: [
                Role,
                Country,
                Patient,
                Therapist,
                TherapeuticForm,
                Question,
                Answer
            ],
            synchronize: true,
        })
    ]
})
export class MysqlDatabaseModule {}
