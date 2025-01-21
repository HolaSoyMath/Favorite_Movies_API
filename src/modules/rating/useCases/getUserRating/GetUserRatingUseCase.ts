import { prisma } from "../../../../prisma/client";
import { checkIdUserExists } from "../../../../utils/checkExists";
import { GetUserRatingDTO } from "../../DTOs/getUserRatingsDTO";

export class GetUserRatingUseCase {
    async execute(userId: string): Promise<GetUserRatingDTO[]> {
        checkIdUserExists(userId);
        const consultUserRatings = await prisma.rating.findMany({
            where: {
                id_user: userId,
            },
        });

        const result = consultUserRatings.map((userRating) => {
            const rating: GetUserRatingDTO = {
                id: userRating.id,
                id_movie: userRating.id_movie,
                rating: userRating.rating.toNumber(),
            };
            return rating;
        });

        return result;
    }
}
