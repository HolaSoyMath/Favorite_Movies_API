import { NextFunction, Request, Response } from "express";
import { UpdateRatingUseCase } from "./updateRatingUseCase";

export class UpdateRatingController{
    handle = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { userId } = req.headers;
            const { movieId, rating} = req.body;

            const updateRatingUseCase = new UpdateRatingUseCase();
            await updateRatingUseCase.execute(String(userId), movieId, rating);

            res.status(204).send();
        } catch (error) {
            next(error)
        }
    }
}