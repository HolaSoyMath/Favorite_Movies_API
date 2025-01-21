import { NextFunction, Request, Response } from "express";
import { GetCommentsByMovieIDUseCase } from "./getCommentsByMovieIDUseCase";

export class GetCommentsByMovieIDController{
    handle = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { movieId } = req.body;
    
            const getCommentsByMovieIDUseCase = new GetCommentsByMovieIDUseCase();
            const result = await getCommentsByMovieIDUseCase.execute(movieId);
    
            res.status(200).json(result);
        } catch (error) {
            next(error)
        }
    }
}