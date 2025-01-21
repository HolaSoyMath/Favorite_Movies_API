import { NextFunction, Request, Response } from "express";
import { DeleteCommentUseCase } from "./deleteCommentUseCase";

export class DeleteCommentController{
    handle = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { userId } = req.headers;
            const { commentId } = req.body;

            const deleteCommentUseCase = new DeleteCommentUseCase();
            await deleteCommentUseCase.execute(String(userId), commentId);

            res.status(200).send("The comment has been deleted.")

        } catch (error) {
            next(error)
        }
    }
}