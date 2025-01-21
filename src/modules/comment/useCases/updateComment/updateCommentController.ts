import { NextFunction, Request, Response } from "express";
import { UpdateCommentUseCase } from "./updateCommentuseCase";

export class UpdateCommentController {
    handle = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { userId } = req.headers;
            const { commentId, comment } = req.body;

            const updateCommentUseCase = new UpdateCommentUseCase();
            const result = await updateCommentUseCase.execute(String(userId), commentId, comment);

            res.status(200).json({...result, "message": "The comment has been updated."})

        } catch (error) {
            next(error)
        }
    }
}