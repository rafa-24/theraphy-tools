import { compare } from "bcrypt";

export async function comparePassword(pass: string, passHashed: string): Promise<boolean> {
    try {
        const match = await compare(pass, passHashed);
        if (!match) return false;
        return true;
    } catch (error) {
        return error;
    }
}