import { NextFunction, Request, Response } from "express";
import { CreateRatingUseCase } from "./createRatingUseCase";
import { checkIdMovieExistsOnTmdb } from "../../../../utils/checkExists";

export class CreateRatingController {
    handle = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<any> => {
        try {
            const { userId } = req.headers;
            const { movieId, rating } = req.body;

            checkIdMovieExistsOnTmdb(movieId);

            const createClassificationUseCase = new CreateRatingUseCase();
            const result = await createClassificationUseCase.execute(
                String(userId),
                movieId,
                rating
            );

            res.status(201).send("Created successfully");
        } catch (error) {
            next(error);
        }
    };
}
