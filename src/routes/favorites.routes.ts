import { Router } from "express";
import { AddFavoriteMovieController } from "../modules/favorites/useCases/addFavoriteMovie/addFavoriteMovieController";
import { GetFavoriteByUserIdController } from "../modules/favorites/useCases/getFavoriteByUserId/getFavoriteByUserIdController";
import { DeleteFavoriteMovieController } from "../modules/favorites/useCases/deleteFavoriteMovie/deleteFavoriteMovieController";
import { body } from "express-validator";
import { validateFieldsOnRoutes } from "../utils/checkTypeParamOnRoute";
import { authenticateJWT } from "../utils/authJWT";

const addFavoriteMovieController = new AddFavoriteMovieController();
const getFavoriteByUserIdController = new GetFavoriteByUserIdController();
const deleteFavoriteMovieController = new DeleteFavoriteMovieController();

const favoriteRouter = Router();

favoriteRouter.get(
    "/",
    authenticateJWT,
    getFavoriteByUserIdController.handle
);

favoriteRouter.post(
    "/",
    authenticateJWT,
    body("movieId").isInt().toInt().escape().withMessage("id_movie must be an integer"),
    validateFieldsOnRoutes,
    addFavoriteMovieController.handle
);

favoriteRouter.delete(
    "/",
    authenticateJWT,
    body("movieId").notEmpty().isInt().toInt().escape().withMessage("movieId can not be null and have to be a number"),
    validateFieldsOnRoutes,
    deleteFavoriteMovieController.handle
);

export { favoriteRouter };
