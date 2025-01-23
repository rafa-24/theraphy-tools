import { CreateResource } from "../interface/create/response-create-resource.interface";

export function validatePassword (pass: string): CreateResource | boolean {
    if(!pass) return { success: false, message: 'empty password field.' };
    return (pass.length < 8) ? { success: false, message: 'the password field should be at least 8 characters long.' } : { success: true, message: 'The password is valid' };
}