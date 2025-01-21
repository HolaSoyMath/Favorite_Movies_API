import { NextFunction, Request, Response } from "express";
import { GetUserRatingUseCase } from "./GetUserRatingUseCase";

export class GetUserRatingController {
    handle = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { userId } = req.headers;

            const getRatingUseCase = new GetUserRatingUseCase();
            const result = await getRatingUseCase.execute(String(userId));

            res.status(200).send(result);
        } catch (error) {
            next(error);
        }
    };
}
