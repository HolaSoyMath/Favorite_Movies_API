import { Rating } from "@prisma/client";
import { AppError } from "../../../../errors/AppError";
import { prisma } from "../../../../prisma/client";
import {
    checkIdMovieExistsOnTmdb,
    checkIdMovieHaveRatingForTheUser,
    checkIdUserExists,
} from "../../../../utils/checkExists";

export class CreateRatingUseCase {
    async execute(
        userId: string,
        movieId: number,
        rating: number
    ): Promise<Rating> {
        await checkIdUserExists(userId);
        await checkIdMovieExistsOnTmdb(movieId);
        const resultRatingForUser = await checkIdMovieHaveRatingForTheUser(
            userId,
            movieId
        );

        if (resultRatingForUser?.id) {
            throw new AppError(
                "A rating already exists for this movie and user.",
                409
            );
        }

        const result = await prisma.rating.create({
            data: {
                id_user: userId,
                id_movie: Number(movieId),
                rating: Number(rating),
            },
        });

        return result;
    }
}
