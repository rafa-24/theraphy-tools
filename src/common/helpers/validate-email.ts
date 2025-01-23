import { CreateResource } from "../interface/create/response-create-resource.interface";

export function validateEmail(email: string): CreateResource | boolean {
    if (!email) return { success: false, message: 'empty email field.'};

    const emailRegex = /^[^\s@]+@(gmail|hotmail|yahoo|outlook)\.(com|co|net|org)$/i;
    return (!emailRegex.test(email)) ?  { success: false, message: 'This is email invalid.' } : { success: true, message: 'email valid.' }


}
