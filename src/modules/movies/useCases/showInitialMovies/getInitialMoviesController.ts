import { NextFunction, Request, Response } from "express";
import { GetInitialMoviesUseCase } from "./getInitialMoviesUseCase";

export class GetInitialMoviesController{
    handle = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { page } = req.body;
            const getInitialMoviesController = new GetInitialMoviesUseCase();
            const movies = await getInitialMoviesController.execute(page);
            res.status(200).json(movies);
        } catch (error) {
            next(error)
        }
    }
}