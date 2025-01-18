import { NextFunction, Request, Response } from "express";
import { GetUserByIDUseCase } from "./getUserByIDUseCase";

export class GetUserByIDController {
    handle = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { userId } = req.headers;
            const getUserByIDUseCase = new GetUserByIDUseCase();
            const result = await getUserByIDUseCase.execute(String(userId));
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    };
}
