import { NextFunction, Request, Response } from "express";
import { GetAverageRatingUseCase } from "./GetAverageRatingUseCase";

export class GetAverageRatingController{
    handle = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { movieId } = req.body;

            const getAverageRatingUseCase = new GetAverageRatingUseCase();
            const result = await getAverageRatingUseCase.execute(movieId);

            res.status(200).json({"average": result});
        } catch (error) {
            next(error);
        }
    }
}