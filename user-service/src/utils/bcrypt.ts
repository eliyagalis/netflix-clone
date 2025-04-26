import bcrypt from 'bcrypt';

export const compare = async(password: string, compare_password: string): Promise<boolean> => {
    return await bcrypt.compare(password, compare_password);
}


//#TODO: add random salt generation
export const hash = async(password: string): Promise<string> => {
    return await bcrypt.hash(password, 10);
}
