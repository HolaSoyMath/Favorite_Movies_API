import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { AppError } from "../errors/AppError";

// Middleware para validação
export function validateFieldsOnRoutes (req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(err => err.msg).join(", ");
        throw new AppError(`Validation error: ${errorMessages}`);
    }
    next();
};