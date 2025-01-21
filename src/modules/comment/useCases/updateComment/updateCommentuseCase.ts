import { prisma } from "../../../../prisma/client";
import { checkCommentCreatedByUser } from "../../../../utils/checkExists";
import { UpdateCommentDTO } from "../../DTOs/updateCommentDTO";

export class UpdateCommentUseCase{
    async execute (userId: string, commentId: number, comment: string): Promise<UpdateCommentDTO>{
        const oldComment = await checkCommentCreatedByUser(userId, commentId);

        const newComment = await prisma.comment.update({
            where: {
                id: commentId,
                id_user: userId
            },
            data: {
                comment: comment
            }
        });

        const result: UpdateCommentDTO = {
            commentId: newComment.id,
            oldComment: oldComment.comment,
            newComment: newComment.comment
        }

        return result;
    }
}