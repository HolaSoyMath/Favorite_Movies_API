import 'dotenv/config';
import jsonwebtoken, { JwtPayload } from 'jsonwebtoken';
import { NextFunction, Request, Response } from "express";

const jwt = jsonwebtoken;

export const authenticateJWT = (req: Request, res: Response, next: NextFunction): void => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            res.status(401).json({ message: "Invalid Access Token - Bearer" });
            return;
        }
        const token = authHeader.split(" ")[1];

        const secretKey = process.env.JWT_SECRET;
        if (!secretKey) {
            res.status(401).json({ message: "JWT_SECRET is not defined" });
            return;
        }

        const jwtData = jwt.verify(token, secretKey) as JwtPayload;
        
        req.headers.userId = jwtData.userId!.toString();
        req.headers.name = jwtData.name.toString();
        req.headers.surname = jwtData.surname.toString();
        req.headers.email = jwtData.email.toString();

        next();
    } catch (error) {
        res.status(401).json({ message: "Unauthorized" });
    }
};