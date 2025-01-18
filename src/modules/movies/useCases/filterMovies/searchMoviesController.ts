import { NextFunction, Request, Response } from "express";
import { SearchMoviesUseCase } from "./searchMoviesUseCase";

export class SearchMoviesController {
    handle = async (req: Request, res: Response, next: NextFunction):Promise<void> => {
        try {
            const { search, page } = req.query;

            const searchMoviesUseCase = new SearchMoviesUseCase();
            const result = await searchMoviesUseCase.execute(String(search), Number(page));
            res.status(200).send(result);
        } catch (error) {
            next(error)
        }
    }
}