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

/**
 * @swagger
 * /favorites:
 *   get:
 *     summary: Obter lista de filmes favoritos do usuário.
 *     tags: [Favorites]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de filmes favoritos do usuário.
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
 *                   movieId:
 *                     type: integer
 *                     example: 12345
 *                   userId:
 *                     type: string
 *                     example: "d76a6124-e608-4757-af9f-65f87bba8d98"
 *       401:
 *         description: Não autorizado.
 *       404:
 *         description: Usuário não encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CheckIdUser'
 */

favoriteRouter.get(
    "/",
    authenticateJWT,
    getFavoriteByUserIdController.handle
);

/**
 * @swagger
 * /favorites:
 *   post:
 *     summary: Adicionar um filme aos favoritos do usuário.
 *     tags: [Favorites]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               movieId:
 *                 type: integer
 *                 description: ID do filme a ser adicionado.
 *                 example: 12345
 *     responses:
 *       201:
 *         description: Filme adicionado com sucesso aos favoritos.
 *       400:
 *         description: Parâmetros inválidos.
 *       401:
 *         description: Não autorizado.
 *       404:
 *         description: Usuário não encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CheckIdUser'
 */

favoriteRouter.post(
    "/",
    authenticateJWT,
    body("movieId").notEmpty().isInt().toInt().escape().withMessage("movieId cannot be null and must be a number"),
    validateFieldsOnRoutes,
    addFavoriteMovieController.handle
);

/**
 * @swagger
 * /favorites:
 *   delete:
 *     summary: Remover um filme da lista de favoritos do usuário.
 *     tags: [Favorites]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               movieId:
 *                 type: integer
 *                 description: ID do filme a ser removido.
 *                 example: 12345
 *     responses:
 *       204:
 *         description: Filme removido com sucesso dos favoritos.
 *       400:
 *         description: Parâmetros inválidos.
 *       401:
 *         description: Não autorizado.
 *       404:
 *         description: Usuário ou filme não encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CheckIdUser'
 */

favoriteRouter.delete(
    "/",
    authenticateJWT,
    body("movieId").notEmpty().isInt().toInt().escape().withMessage("movieId can not be null and have to be a number"),
    validateFieldsOnRoutes,
    deleteFavoriteMovieController.handle
);

export { favoriteRouter };
