import { Favorite } from "@prisma/client";
import { AppError } from "../../../../errors/AppError";
import { prisma } from "../../../../prisma/client";
import {
    checkIdMovieExistsOnTmdb,
    checkIdUserExists,
} from "../../../../utils/checkExists";
import { isNumber } from "../../../../utils/validation";
import { AddFavoriteMovieDTO } from "../../dto/addFavoriteMovieDTO";
import { GetFavoriteByUserIdUseCase } from "../getFavoriteByUserId/getFavoriteByUserIdUseCase";

export class DeleteFavoriteMovieUseCase {
    async execute({
        userId,
        movieId,
    }: AddFavoriteMovieDTO): Promise<Favorite[]> {
        checkIdUserExists(userId);
        isNumber({ movieId });
        checkIdMovieExistsOnTmdb(movieId);
        const isFavoriteMovieLinkedToUser = await prisma.favorite.findFirst({
            where: {
                id_movie: movieId,
                id_user: userId,
            },
        });

        if (!isFavoriteMovieLinkedToUser) {
            throw new AppError(
                "Favorite movie not linked to selected user",
                404
            );
        }

        await prisma.favorite.delete({
            where: {
                id: isFavoriteMovieLinkedToUser.id,
            },
        });

        const getFavoriteByUserId = new GetFavoriteByUserIdUseCase();
        const result = getFavoriteByUserId.execute(userId);

        return result;
    }
}
