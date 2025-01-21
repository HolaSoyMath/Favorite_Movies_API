import { prisma } from "../../../../prisma/client";
import { checkCommentCreatedByUser } from "../../../../utils/checkExists";

export class DeleteCommentUseCase {
    async execute(userId: string, commentId: number): Promise<void> {
        await checkCommentCreatedByUser(userId, commentId);

        await prisma.comment.delete({
            where: {
                id: Number(commentId),
            },
        });

        return;
    }
}
