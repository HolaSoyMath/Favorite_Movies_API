import { Router } from "express";
import { CreateRatingController } from "../modules/classification/useCases/createRating/createRatingController";
import { authenticateJWT } from "../utils/authJWT";
import { body } from "express-validator";
import { validateFieldsOnRoutes } from "../utils/checkTypeParamOnRoute";

const createRatingController = new CreateRatingController();

const ratingRoutes = Router();

ratingRoutes.post(
    "/",
    authenticateJWT,
    body("movieId").notEmpty().isInt().toInt().escape().withMessage("movieId cannot be null and must be a number"),
    body("rating").notEmpty().isInt({ min: 0.5, max: 5 }).toFloat().escape().withMessage("Rating cannot be null, must be a number and must be between 0.5 and 5."),
    validateFieldsOnRoutes,
    createRatingController.handle
);

export { ratingRoutes };
