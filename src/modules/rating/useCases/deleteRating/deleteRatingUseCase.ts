import { Rating } from "@prisma/client";
import { AppError } from "../../../../errors/AppError";
import { prisma } from "../../../../prisma/client";
import { checkIdMovieHaveRatingForTheUser, checkIdUserExists } from "../../../../utils/checkExists";

export class DeleteRatingUseCase {
    async execute(userId:string, movieId:number): Promise<Rating> {
        try {
            checkIdUserExists(userId);
            const resultRatingForUser = await checkIdMovieHaveRatingForTheUser(userId, movieId);
            if (!resultRatingForUser?.id){
                throw new AppError("A rating does not exist for this movie and user.", 404);
            }
    
            const result = await prisma.rating.delete({
                where: {
                    id: resultRatingForUser.id
                },
            });
    
            return result;
        } catch (error) {
            throw new AppError("The movie has no rating from this user.", 500)
        }
    }
}