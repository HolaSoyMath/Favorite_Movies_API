import { Favorite } from "@prisma/client";
import { AppError } from "../../../../errors/AppError";
import { prisma } from "../../../../prisma/client";
import { checkIdUserExists } from "../../../../utils/checkExists";
import { getAllInfosMovie } from "../../../../utils/geetInfoFromTmdb";
import { AddFavoriteMovieDTO } from "../../dto/addFavoriteMovieDTO";

export class AddFavoriteMovieUseCase {
    async execute(favoriteMovieAdd: AddFavoriteMovieDTO): Promise<Favorite> {
        try {
            const { userId, movieId } = favoriteMovieAdd;
            await checkIdUserExists(userId);
            if (isNaN(Number(movieId))) {
                throw new AppError("MovieID is not a number");
            }
    
            await getAllInfosMovie(Number(movieId));
            const isFavoritedMovieByUser = await prisma.favorite.findFirst({
                where: {
                    id_movie: movieId,
                    id_user: userId,
                },
            });
    
            if (isFavoritedMovieByUser) {
                throw new AppError(
                    "This movie is already in the user's favorites.",
                    409
                );
            }
    
            const newFavoriteMovie = await prisma.favorite.create({
                data: {
                    id_movie: movieId,
                    id_user: userId,
                },
            });
    
            return newFavoriteMovie;
        } catch (error) {
            throw new AppError("Not possible add a movie to Favorite");
        }
    }
}