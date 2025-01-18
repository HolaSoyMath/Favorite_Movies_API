import dotenv from 'dotenv';
import express, { NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import { routes } from './routes';
import { AppError } from './errors/AppError';

dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(helmet());
app.use(routes);

app.use((err: Error, req: Request, res: Response, next: NextFunction): any => {
    if (err instanceof AppError){
        return res.status(err.statusCode).json({
            status: "error",
            message: err.message
        })
    }

    if (err instanceof Error) {
        return res.status(500).json({
            status: "error",
            message: `Internal server error - ${err.message}`,
        });
    }

    return res.status(500).json({
    status: "error",
    message: "An unknown error occurred",
    });
})

app.listen(port, () => console.log("Server is running in port " + port));