import { Router } from "express";
import { GetInitialMoviesController } from "../modules/movies/useCases/showInitialMovies/getInitialMoviesController";
import { SearchMoviesController } from "../modules/movies/useCases/filterMovies/searchMoviesController";
import { body, query } from "express-validator";
import { validateFieldsOnRoutes } from "../utils/checkTypeParamOnRoute";
import { authenticateJWT } from "../utils/authJWT";

const getInitialMoviesController = new GetInitialMoviesController();
const searchMoviesController = new SearchMoviesController();

const moviesRouter = Router();

/**
 * @swagger
 * /movies:
 *   get:
 *     summary: Obter uma lista inicial de filmes.
 *     tags: [Movies, Public]
 *     parameters:
 *       - in: query
 *         name: page
 *         required: true
 *         schema:
 *           type: integer
 *         description: Número da página para paginação.
 *     responses:
 *       200:
 *         description: Lista de filmes.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   title:
 *                     type: string
 *                     example: "The Matrix"
 *                   release_date:
 *                     type: string
 *                     example: "1999-03-31"
 *       400:
 *         description: Parâmetros inválidos.
 *       401:
 *         description: Não autorizado.
 */
moviesRouter.get(
    "/",
    body("page").isInt().escape().withMessage("page must be a valid page"),
    validateFieldsOnRoutes,
    getInitialMoviesController.handle
);

/**
 * @swagger
 * /movies/search:
 *   get:
 *     summary: Buscar filmes por nome.
 *     tags: [Movies, Public]
 *     parameters:
 *       - in: query
 *         name: page
 *         required: true
 *         schema:
 *           type: integer
 *         description: Número da página para paginação.
 *       - in: query
 *         name: search
 *         required: true
 *         schema:
 *           type: string
 *         description: Termo de busca para filmes.
 *     responses:
 *       200:
 *         description: Resultados da busca.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   title:
 *                     type: string
 *                     example: "The Matrix"
 *                   release_date:
 *                     type: string
 *                     example: "1999-03-31"
 *       400:
 *         description: Parâmetros inválidos.
 *       401:
 *         description: Não autorizado.
 */
moviesRouter.get(
    "/search",
    query("page").isInt({gt: 0}).notEmpty().escape().withMessage("page can not be null and have to be positive integer number"),
    query("search").notEmpty().escape().withMessage("search can not be null"),
    validateFieldsOnRoutes,
    searchMoviesController.handle
);

export { moviesRouter };
