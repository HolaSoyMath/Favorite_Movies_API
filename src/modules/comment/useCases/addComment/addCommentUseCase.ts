import { AppError } from "../../../../errors/AppError";
import { prisma } from "../../../../prisma/client";
import {
    checkCommentDuplicated,
    checkIdMovieExistsOnTmdb,
    checkIdUserExists,
} from "../../../../utils/checkExists";
import { AddCommentDTO } from "../../DTOs/addCommentDTO";

export class AddCommentUseCase {
    async execute(
        userId: string,
        movieId: number,
        comment: string
    ): Promise<AddCommentDTO> {
        await checkIdUserExists(userId);
        await checkIdMovieExistsOnTmdb(movieId);
        await checkCommentDuplicated(userId, movieId, comment);

        const respCreate = await prisma.comment.create({
            data: {
                id_user: userId,
                id_movie: Number(movieId),
                comment: comment,
            },
        });

        const result: AddCommentDTO = {
            commentId: respCreate.id,
            userId: respCreate.id_user,
            movieId: respCreate.id_movie,
        } 

        return result;
    }
}
