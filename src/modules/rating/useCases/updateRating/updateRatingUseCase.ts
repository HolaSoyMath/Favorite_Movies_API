import { Rating } from "@prisma/client";
import { AppError } from "../../../../errors/AppError";
import {
    checkIdMovieHaveRatingForTheUser,
    checkIdUserExists,
} from "../../../../utils/checkExists";
import { prisma } from "../../../../prisma/client";

export class UpdateRatingUseCase {
    async execute(
        userId: string,
        movieId: number,
        rating: number
    ): Promise<Rating> {
        const resultRating = await checkIdMovieHaveRatingForTheUser(
            userId,
            movieId
        );
        if (!resultRating?.id) {
            throw new AppError("The movie is no rating from this User");
        }

        const result = await prisma.rating.update({
            where: {
                id: resultRating.id,
            },
            data: {
                rating: rating,
            },
        });

        return result;
    }
}
