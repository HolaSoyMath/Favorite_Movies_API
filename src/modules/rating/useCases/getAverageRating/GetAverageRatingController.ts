import { NextFunction, Request, Response } from "express";
import { GetAverageRatingUseCase } from "./GetAverageRatingUseCase";

export class GetAverageRatingController{
    handle = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { movieId } = req.query;

            const getAverageRatingUseCase = new GetAverageRatingUseCase();
            const result = await getAverageRatingUseCase.execute(Number(movieId));

            res.status(200).json({"average": result});
        } catch (error) {
            next(error);
        }
    }
}