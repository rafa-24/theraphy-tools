import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
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
            database: 'teraphy',
            entities: [
                Role,
                Country,
                Patient,
                Therapist
            ],
            synchronize: true,
        })
    ]
})
export class MysqlDatabaseModule {}
