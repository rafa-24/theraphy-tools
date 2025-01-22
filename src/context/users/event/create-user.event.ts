export class CreatePatientEvent {
    constructor(
        public readonly patientName: string,
        public readonly paternalSurname: string,
        public readonly telephoneNumber: string,
        public readonly country: number,
        public readonly email: string,
        public readonly role: number,
        public readonly password: string,
    ) {}
}