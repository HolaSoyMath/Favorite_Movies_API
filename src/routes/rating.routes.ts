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

/**
 * @swagger
 * /ratings:
 *   post:
 *     summary: Criar uma avaliação para um filme.
 *     tags: [Ratings]
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
 *                 description: ID do filme avaliado.
 *                 example: 12345
 *               rating:
 *                 type: integer
 *                 description: Nota de avaliação (1 a 5).
 *                 example: 4
 *     responses:
 *       201:
 *         description: Avaliação criada com sucesso.
 *       400:
 *         description: Parâmetros inválidos.
 *       401:
 *         description: Não autorizado.
 */
ratingRouter.post(
    "/",
    authenticateJWT,
    body("movieId").notEmpty().isInt().toInt().escape().withMessage("movieId cannot be null and must be a number"),
    body("rating").notEmpty().isFloat({ min: 0.5, max: 5 }).toFloat().escape().withMessage("Rating cannot be null, must be a number and must be between 0.5 and 5."),
    validateFieldsOnRoutes,
    createRatingController.handle
);

/**
 * @swagger
 * /ratings:
 *   delete:
 *     summary: Remover uma avaliação de um filme.
 *     tags: [Ratings]
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
 *                 description: ID do filme avaliado.
 *                 example: 12345
 *     responses:
 *       200:
 *         description: Avaliação removida com sucesso.
 *       400:
 *         description: Parâmetros inválidos.
 *       401:
 *         description: Não autorizado.
 */
ratingRouter.delete(
    "/",
    authenticateJWT,
    body("movieId").notEmpty().isInt().toInt().escape().withMessage("movieId cannot be null and must be a number"),
    validateFieldsOnRoutes,
    deleteRatingController.handle
);

/**
 * @swagger
 * /ratings:
 *   patch:
 *     summary: Atualizar a nota de uma avaliação.
 *     tags: [Ratings]
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
 *                 description: ID do filme avaliado.
 *                 example: 12345
 *               rating:
 *                 type: integer
 *                 description: Nova nota de avaliação (1 a 5).
 *                 example: 5
 *     responses:
 *       204:
 *         description: Avaliação atualizada com sucesso.
 *       400:
 *         description: Parâmetros inválidos.
 *       401:
 *         description: Não autorizado.
 */
ratingRouter.patch(
    "/",
    authenticateJWT,
    body("movieId").notEmpty().isInt().toInt().escape().withMessage("movieId cannot be null and must be a number"),
    body("rating").notEmpty().isFloat({ min: 0.5, max: 5 }).toFloat().escape().withMessage("Rating cannot be null, must be a number and must be between 0.5 and 5."),
    validateFieldsOnRoutes,
    updateRatingController.handle
);

/**
 * @swagger
 * /ratings:
 *   get:
 *     summary: Obter as avaliações feitas pelo usuário autenticado.
 *     tags: [Ratings]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de avaliações do usuário.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   movieId:
 *                     type: integer
 *                     example: 12345
 *                   rating:
 *                     type: integer
 *                     example: 4
 *                   userId:
 *                     type: string
 *                     example: "d76a6124-e608-4757-af9f-65f87bba8d98"
 *       401:
 *         description: Não autorizado. O token de acesso é inválido ou ausente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Unauthorized: Invalid or missing token."
 *       400:
 *         description: Erro de validação ou parâmetros ausentes.
 */
ratingRouter.get(
    "/",
    authenticateJWT,
    validateFieldsOnRoutes,
    getUserRatingController.handle
);

/**
 * @swagger
 * /ratings/average:
 *   get:
 *     summary: Obter a nota média de um filme.
 *     tags: [Ratings, Public]
 *     parameters:
 *       - in: query
 *         name: movieId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do filme.
 *     responses:
 *       200:
 *         description: Nota média do filme.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 average:
 *                   type: number
 *                   example: 4.5
 *       400:
 *         description: Parâmetros inválidos.
 */
ratingRouter.get(
    "/average",
    body("movieId").notEmpty().isInt().toInt().escape().withMessage("movieId cannot be null and must be a number"),
    validateFieldsOnRoutes,
    getAverageRatingController.handle
);

export { ratingRouter };
