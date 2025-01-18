import { AppError } from "../../../../errors/AppError";
import { prisma } from "../../../../prisma/client";
import { compareHashValue } from "../../../../utils/hashing";
import { isValidEmail } from "../../../../utils/validation";
import { LoginUserDTO } from "../../dtos/LoginUserDTO";
import 'dotenv/config';
import jsonwebtoken from 'jsonwebtoken';
const jwt = jsonwebtoken;

export class LoginUserUseCase {
    async execute({ login, password }: LoginUserDTO): Promise<string> {
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined in the environment variables.");
        }

        let IDUser: any;
        
        if(isValidEmail(login)){
            IDUser = await prisma.user.findUnique({
                where: { email: login }
            });
        } else {
            IDUser = await prisma.user.findUnique({
                where: { login }
            });
        }
        if(!IDUser){
            throw new AppError("Login not found!")
        }
        const verifyPassword = await compareHashValue(password, IDUser.password)
        if (verifyPassword){
            const token = jwt.sign({userId: IDUser.id, name: IDUser.login, surname: IDUser.surname, email: IDUser.email }, process.env.JWT_SECRET, {expiresIn: '1h'});
            return token;
        } else {
            throw new AppError("Password incorrect!")
        }
    }
}