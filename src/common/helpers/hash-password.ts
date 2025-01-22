import * as bcrypt from 'bcrypt';

export async function hashPassword(password: string): Promise<string> {
    if (!password) {
        throw new Error('Password is required');
    }

    const saltRound = 10;
    const hashedPassword = await bcrypt.hash(password, saltRound);
    return hashedPassword;
}
