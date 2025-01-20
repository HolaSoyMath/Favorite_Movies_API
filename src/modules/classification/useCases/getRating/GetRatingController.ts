import { NextFunction, Request, Response } from "express";
import { GetRatingUseCase } from "./GetRatingUseCase";

export class GetRatingController{
    handle = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { userId } = req.headers;

            const getRatingUseCase = new GetRatingUseCase();
            const result = await getRatingUseCase.execute(String(userId));

            res.status(200).send(result);
            
        } catch (error) {
            next(error)
        }
    }
}