import { Router } from "express";
import { CreateRatingController } from "../modules/rating/useCases/createRating/createRatingController";
import { authenticateJWT } from "../utils/authJWT";
import { body } from "express-validator";
import { validateFieldsOnRoutes } from "../utils/checkTypeParamOnRoute";
import { DeleteRatingController } from "../modules/rating/useCases/deleteRating/deleteRatingController";
import { UpdateRatingController } from "../modules/rating/useCases/updateRating/updateRatingController";
import { GetUserRatingController } from "../modules/rating/useCases/getUserRating/GetUserRatingController";
import { GetAverageRatingController } from "../modules/rating/useCases/getAverageRating/GetAverageRatingController";

const createRatingController = new CreateRatingController();
const deleteRatingController = new DeleteRatingController();
const updateRatingController = new UpdateRatingController();
const getUserRatingController = new GetUserRatingController();
const getAverageRatingController = new GetAverageRatingController();

const ratingRouter = Router();

ratingRouter.post(
    "/",
    authenticateJWT,
    body("movieId").notEmpty().isInt().toInt().escape().withMessage("movieId cannot be null and must be a number"),
    body("rating").notEmpty().isFloat({ min: 0.5, max: 5 }).toFloat().escape().withMessage("Rating cannot be null, must be a number and must be between 0.5 and 5."),
    validateFieldsOnRoutes,
    createRatingController.handle
);

ratingRouter.delete(
    "/",
    authenticateJWT,
    body("movieId").notEmpty().isInt().toInt().escape().withMessage("movieId cannot be null and must be a number"),
    validateFieldsOnRoutes,
    deleteRatingController.handle
);

ratingRouter.patch(
    "/",
    authenticateJWT,
    body("movieId").notEmpty().isInt().toInt().escape().withMessage("movieId cannot be null and must be a number"),
    body("rating").notEmpty().isFloat({ min: 0.5, max: 5 }).toFloat().escape().withMessage("Rating cannot be null, must be a number and must be between 0.5 and 5."),
    validateFieldsOnRoutes,
    updateRatingController.handle
);

ratingRouter.get(
    "/",
    authenticateJWT,
    validateFieldsOnRoutes,
    getUserRatingController.handle
);

ratingRouter.get(
    "/average",
    body("movieId").notEmpty().isInt().toInt().escape().withMessage("movieId cannot be null and must be a number"),
    validateFieldsOnRoutes,
    getAverageRatingController.handle
);

export { ratingRouter };
