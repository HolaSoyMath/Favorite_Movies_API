import { Rating } from "@prisma/client";
import { AppError } from "../../../../errors/AppError";
import { prisma } from "../../../../prisma/client";
import { checkIdUserExists } from "../../../../utils/checkExists";
import { GetRatingDTO } from "../../DTOs/getRatingsDTO";

export class GetRatingUseCase {
    async execute(userId: string): Promise<GetRatingDTO[]> {
        try {
            checkIdUserExists(userId);
            const consultUserRatings = await prisma.rating.findMany({
                where: {
                    id_user: userId,
                },
            });

            const result = consultUserRatings.map((userRating) => {
                const rating: GetRatingDTO = {
                    id: userRating.id,
                    id_movie: userRating.id_movie,
                    rating: userRating.rating.toNumber(),
                };
                return rating;
            });

            return result;
        } catch (error) {
            throw new AppError("Cannot possible get the ratings by the user.");
        }
    }
}
