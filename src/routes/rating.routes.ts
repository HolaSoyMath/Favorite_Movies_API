import { Router } from "express";
import { CreateRatingController } from "../modules/classification/useCases/createRating/createRatingController";
import { authenticateJWT } from "../utils/authJWT";
import { body } from "express-validator";
import { validateFieldsOnRoutes } from "../utils/checkTypeParamOnRoute";
import { DeleteRatingController } from "../modules/classification/useCases/deleteRating/deleteRatingController";
import { UpdateRatingController } from "../modules/classification/useCases/updateRating/updateRatingController";
import { GetRatingController } from "../modules/classification/useCases/getRating/GetRatingController";

const createRatingController = new CreateRatingController();
const deleteRatingController = new DeleteRatingController();
const updateRatingController = new UpdateRatingController();
const getRatingController = new GetRatingController();

const ratingRoutes = Router();

ratingRoutes.post(
    "/",
    authenticateJWT,
    body("movieId").notEmpty().isInt().toInt().escape().withMessage("movieId cannot be null and must be a number"),
    body("rating").notEmpty().isFloat({ min: 0.5, max: 5 }).toFloat().escape().withMessage("Rating cannot be null, must be a number and must be between 0.5 and 5."),
    validateFieldsOnRoutes,
    createRatingController.handle
);

ratingRoutes.delete("/",
    authenticateJWT,
    body("movieId").notEmpty().isInt().toInt().escape().withMessage("movieId cannot be null and must be a number"),
    validateFieldsOnRoutes,
    deleteRatingController.handle
)

ratingRoutes.patch("/",
    authenticateJWT,
    body("movieId").notEmpty().isInt().toInt().escape().withMessage("movieId cannot be null and must be a number"),
    body("rating").notEmpty().isFloat({ min: 0.5, max: 5 }).toFloat().escape().withMessage("Rating cannot be null, must be a number and must be between 0.5 and 5."),
    validateFieldsOnRoutes,
    updateRatingController.handle
)

ratingRoutes.get("/",
    authenticateJWT,
    validateFieldsOnRoutes,
    getRatingController.handle
)

export { ratingRoutes };
