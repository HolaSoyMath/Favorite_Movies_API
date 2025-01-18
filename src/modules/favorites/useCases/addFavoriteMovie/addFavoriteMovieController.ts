import { NextFunction, Request, Response } from "express";
import { AddFavoriteMovieDTO } from "../../dto/addFavoriteMovieDTO";
import { AddFavoriteMovieUseCase } from "./addFavoriteMovieUseCase";

export class AddFavoriteMovieController {
    handle = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { movieId } = req.body;
            const {userId} = req.headers;

            const addFavoriteDTO: AddFavoriteMovieDTO = {
                movieId: Number(movieId),
                userId: String(userId),
            };

            const addFavoriteMovieUseCase = new AddFavoriteMovieUseCase();
            const result = await addFavoriteMovieUseCase.execute(
                addFavoriteDTO
            );

            res.status(201).send(result);
        } catch (error) {
            next(error);
        }
    };
}
