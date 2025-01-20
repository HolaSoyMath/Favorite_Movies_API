import { NextFunction, Request, Response } from "express";
import { DeleteRatingUseCase } from "./deleteRatingUseCase";

export class DeleteRatingController {
    handle = async (req:Request ,res: Response, next: NextFunction) => {
        try {
            const { userId } = req.headers;
            const { movieId } = req.body;

            const deleteRatingUseCase = new DeleteRatingUseCase()
            const result = await deleteRatingUseCase.execute(String(userId), movieId);

            res.status(200).json(result);
        } catch (error) {
            next(error)
        }
    }
}
