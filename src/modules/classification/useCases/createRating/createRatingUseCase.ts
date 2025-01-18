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
        try {
            await checkIdUserExists(userId);
            await checkIdMovieExistsOnTmdb(movieId);
            await checkIdMovieHaveRatingForTheUser(movieId, userId);

            const result = await prisma.rating.create({
                data: {
                    id_user: userId,
                    id_movie: Number(movieId),
                    rating: Number(rating),
                },
            });

            return result;
        } catch (error) {
            throw new AppError(
                "Not possible create a classification from user to movie"
            );
        }
    }
}
