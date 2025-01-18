import { NextFunction, Request, Response } from "express";
import { CreateUserUseCase } from "./CreateUserUseCase";

export class CreateUserController {
    handle = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { name, surname, email, login, password } = req.body;
            const createUserUseCase = new CreateUserUseCase();
            const result = await createUserUseCase.execute({ name, surname, email, login, password });
            res.status(201).json(result);
        } catch (error) {
            next(error);
        }
    }
}