import { CountryOutputInterface } from "./country-output.interface";
import { RoleOutputInterface } from "./role-output.interface";

export interface TherapistOutputInterface {
    therapistId:             number;
    name:                    string;
    paternalSurname:         string;
    telephoneNumber:         string;
    email:                   string;
    universityDegree:        string;
    workExperience:          number;
    password:                string;
    verificationCode?:        null | string;
    isValidVerificationCode?: null | boolean;
    fkCountry:               CountryOutputInterface;
    fkRole:                  RoleOutputInterface;
}