import { NextFunction, Request, Response } from "express";
import { GetFavoriteByUserIdUseCase } from "./getFavoriteByUserIdUseCase";

export class GetFavoriteByUserIdController {
    handle = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        try {
            const {userId} = req.headers;
            const getFavoriteByUserIdUseCase = new GetFavoriteByUserIdUseCase();
            const result = await getFavoriteByUserIdUseCase.execute(String(userId));
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    };
}
