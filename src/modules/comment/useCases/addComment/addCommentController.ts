import { NextFunction, Request, Response } from "express";
import { AddCommentUseCase } from "./addCommentUseCase";

export class AddCommentController{
    handle = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { userId } = req.headers;
            const { movieId, comment } = req.body;
    
            const addCommentUseCase = new AddCommentUseCase();
            const result = await addCommentUseCase.execute(String(userId), movieId, comment);
    
            res.status(201).json({...result, "message": "The comment has been created"});
        } catch (error) {
            next (error)
        }
    }
}