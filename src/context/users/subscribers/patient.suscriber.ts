import { EventSubscriber, EntitySubscriberInterface, InsertEvent } from "typeorm";
import { Injectable } from "@nestjs/common";
import { Patient } from "../model/entities/patient.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Country } from "../model/entities/country.entity";
import { Role } from "../model/entities/role.entity";
import { createExceptionError } from "src/common/exceptions/create-exception-error";

@Injectable()
@EventSubscriber()
export class PatientSubscriber implements EntitySubscriberInterface<Patient> {
    constructor(
        @InjectRepository(Country)
        private readonly countryRepository: Repository<Country>,
        @InjectRepository(Role)
        private readonly roleRepository: Repository<Role>,
    ) {}

    /**
     * Listen to the entity being listened for.
     */
    listenTo() {
        return Patient;
    }

    /**
     * Called before a patient is inserted.
     */
    async beforeInsert(event: InsertEvent<Patient>): Promise<void> {
        const {entity} = event;

        // choose a country
        const country = await this.countryRepository.findOne({
            where: {patientId: entity.fkCountry.patientId}
        });
        if (!country) createExceptionError('country not found');

        // choose a role
        const role = await this.roleRepository.findOne({
            where: {rolId: entity.fkRole.rolId}
        });
        if (!role) createExceptionError('role not found');
    }
}
