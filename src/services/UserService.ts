import { User } from "../models/User";
import bcrypt from "bcryptjs"


export const createUser = async (email: string, password: string) => {
    const hasUser = await User.findOne({ where: { email } });

    if (!hasUser) {
        const hash = bcrypt.hashSync(password, 10);
        const newUser = await User.create({
            email,
            password: hash
        });
        return newUser;
    } else {
        return new Error("O e-mail já existe.");
    }
}

export const findByEmail = async (email: string) => {
    return await User.findOne({ where: { email } });
}

export const matchPassword = async (decrypted: string, encrypted: string) => {
    return bcrypt.compareSync(decrypted, encrypted);
}

export const allUsers = async () => { 
    return await User.findAll();
}