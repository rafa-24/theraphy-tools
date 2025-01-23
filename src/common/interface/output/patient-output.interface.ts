import { CountryOutputInterface } from "./country-output.interface";
import { RoleOutputInterface } from "./role-output.interface";

export interface PatientOutputInterface {
    patientId:               number;
    name:                    string;
    paternalSurname:         string;
    telephoneNumber:         string;
    email:                   string;
    password:                string;
    verificationCode:        null | string;
    isValidVerificationCode: null | boolean;
    fkCountry:               CountryOutputInterface;
    fkRole:                  RoleOutputInterface;
}