import { Router } from "express";
import { GetInitialMoviesController } from "../modules/movies/useCases/showInitialMovies/getInitialMoviesController";
import { SearchMoviesController } from "../modules/movies/useCases/filterMovies/searchMoviesController";
import { body, query } from "express-validator";
import { validateFieldsOnRoutes } from "../utils/checkTypeParamOnRoute";
import { authenticateJWT } from "../utils/authJWT";

const getInitialMoviesController = new GetInitialMoviesController();
const searchMoviesController = new SearchMoviesController();

const moviesRouter = Router();

moviesRouter.get(
    "/",
    authenticateJWT,
    body("page").isInt().escape().withMessage("page must be a valid page"),
    validateFieldsOnRoutes,
    getInitialMoviesController.handle
);
moviesRouter.get(
    "/search",
    authenticateJWT,
    query("page").isInt({gt: 0}).notEmpty().escape().withMessage("page can not be null and have to be positive integer number"),
    query("search").notEmpty().escape().withMessage("search can not be null"),
    validateFieldsOnRoutes,
    searchMoviesController.handle
);

export { moviesRouter };
