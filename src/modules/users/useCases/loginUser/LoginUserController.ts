import { NextFunction, Request, Response } from "express";
import { LoginUserUseCase } from "./LoginUserUseCase";

export class LoginUserController {
    handle = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { login, password } = req.body;
            const loginUserCaseUse = new LoginUserUseCase();
            const result = await loginUserCaseUse.execute({ login, password });
            res.status(200).json({
                authorization: true,
                token: result
            });
        } catch (error) {
            next(error)
        }
    }
}