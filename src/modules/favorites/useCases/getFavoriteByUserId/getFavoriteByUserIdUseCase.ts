import { Favorite } from "@prisma/client";
import { prisma } from "../../../../prisma/client";
import { checkIdUserExists } from "../../../../utils/checkExists";
import { AppError } from "../../../../errors/AppError";

export class GetFavoriteByUserIdUseCase {
    async execute(userId: string): Promise<Favorite[]> {
        checkIdUserExists(userId);

        const result = await prisma.favorite.findMany({
            orderBy: {
                created_at: "desc",
            },
            where: {
                id_user: userId,
            },
        });

        return result;
    }
}
