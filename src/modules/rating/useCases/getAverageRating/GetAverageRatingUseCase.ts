import { prisma } from "../../../../prisma/client";

export class GetAverageRatingUseCase{
    async execute (movieId: number): Promise<number> {
        const result = await prisma.rating.aggregate({
            _avg: {
                rating: true
            },
            where: {
                id_movie: Number(movieId)
            }
        });

        const average = result._avg.rating ? Number(result._avg.rating) : 0;

        return average;
    }
}