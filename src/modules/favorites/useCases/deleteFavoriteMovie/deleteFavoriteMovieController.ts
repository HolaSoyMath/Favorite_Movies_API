import { NextFunction, Request, Response } from "express";
import { AddFavoriteMovieDTO } from "../../dto/addFavoriteMovieDTO";
import { DeleteFavoriteMovieUseCase } from "./deleteFavoriteMovieUseCase";

export class DeleteFavoriteMovieController {
    handle = async (req: Request,res: Response,next: NextFunction): Promise<void> => {
        try {
            const { movieId } = req.body;
            const {userId} = req.headers;
            const removeFavoriteDTO: AddFavoriteMovieDTO = {
                movieId: Number(movieId),
                userId: String(userId),
            };

            const deleteFavoriteMovieUseCase = new DeleteFavoriteMovieUseCase();
            await deleteFavoriteMovieUseCase.execute(removeFavoriteDTO);

            res.status(204).send("Item removed from the favorite list!");
        } catch (error) {
            next(error);
        }
    };
}
