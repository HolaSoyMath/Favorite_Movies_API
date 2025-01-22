import { Router } from "express";
import { AddCommentController } from "../modules/comment/useCases/addComment/addCommentController";
import { authenticateJWT } from "../utils/authJWT";
import { body } from "express-validator";
import { validateFieldsOnRoutes } from "../utils/checkTypeParamOnRoute";
import { DeleteCommentController } from "../modules/comment/useCases/deleteComment/deleteCommentController";
import { UpdateCommentController } from "../modules/comment/useCases/updateComment/updateCommentController";
import { GetCommentsByMovieIDController } from "../modules/comment/useCases/getCommentsByMovieID/getCommentsByMovieIDController";

const commentRouter = Router();

const addCommentController = new AddCommentController();
const deleteCommentController = new DeleteCommentController();
const updateCommentController = new UpdateCommentController();
const getCommentsByMovieIDController = new GetCommentsByMovieIDController();

/**
 * @swagger
 * /comment:
 *   post:
 *     summary: Adicionar um novo comentário.
 *     tags: [Comments]
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
 *                 description: ID do filme que receberá o comentário.
 *               comment:
 *                 type: string
 *                 description: Conteúdo do comentário.
 *             required:
 *               - movieId
 *               - comment
 *     responses:
 *       201:
 *         description: Comentário criado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 commentId:
 *                   type: integer
 *                   example: 5
 *                 userId:
 *                   type: string
 *                   example: "d76a6124-e608-4757-af9f-65f87bba8d98"
 *                 movieId:
 *                   type: integer
 *                   example: 950387
 *                 message:
 *                   type: string
 *                   example: "The comment has been created."
 *       400:
 *         description: Comentário duplicado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: "The comment is duplicated."
 *       401:
 *         description: Invalid Access Token - Bearer.
 *       404:
 *         description: Usuário não encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - $ref: '#/components/schemas/CheckIdUser'
 *                 - $ref: '#/components/schemas/MovieNotFoundOnTMDB'
 *                 - $ref: '#/components/schemas/CommentDuplicatedError'
 */
commentRouter.post(
    "/",
    authenticateJWT,
    body("movieId").notEmpty().isInt().toInt().escape().withMessage("movieId cannot be null and must be a number"),
    body("comment").notEmpty().escape().withMessage("comment cannot be null"),
    validateFieldsOnRoutes,
    addCommentController.handle
);

/**
 * @swagger
 * /comment:
 *   delete:
 *     summary: Deletar um comentário.
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               commentId:
 *                 type: integer
 *                 description: ID do comentário a ser deletado.
 *             required:
 *               - commentId
 *     responses:
 *       200:
 *         description: Comentário deletado com sucesso.
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "The comment has been deleted."
 *       400:
 *         description: Ocorreu um erro de validação (e.g., o comentário não pertence ao usuário).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Validation error: The comment does not exist or does not belong to the user."
 *       401:
 *         description: Não autorizado. O token JWT está ausente ou inválido.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Unauthorized: Invalid or missing token."
 *       404:
 *         description: Comentário não encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Comment not found."
 *       500:
 *         description: Erro interno no servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error."
 */
commentRouter.delete("/",
    authenticateJWT,
    body("commentId").isInt().toInt().notEmpty().withMessage("commentId can not be null and must be a number"),
    validateFieldsOnRoutes,
    deleteCommentController.handle
)

/**
 * @swagger
 * /comment:
 *   patch:
 *     summary: Atualizar um comentário.
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               commentId:
 *                 type: integer
 *                 description: ID do comentário a ser atualizado.
 *               comment:
 *                 type: string
 *                 description: Novo conteúdo do comentário.
 *             required:
 *               - commentId
 *               - comment
 *     responses:
 *       200:
 *         description: Comentário atualizado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 commentId:
 *                   type: integer
 *                 oldComment:
 *                   type: string
 *                 newComment:
 *                   type: string
 *                 message:
 *                   type: string
 *                   example: "The comment has been updated."
 *       400:
 *         description: Validação falhou (e.g., o comentário não pertence ao usuário).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Validation error: The comment does not exist or does not belong to the user."
 *       401:
 *         description: Não autorizado. O token JWT está ausente ou inválido.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Unauthorized: Invalid or missing token."
 *       404:
 *         description: Comentário não encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Comment not found."
 *       500:
 *         description: Erro interno no servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error."
 */
commentRouter.patch("/",
    authenticateJWT,
    body("commentId").isInt().toInt().notEmpty().withMessage("commentId can not be null and must be a number"),
    body("comment").notEmpty().escape().withMessage("comment cannot be null"),
    validateFieldsOnRoutes,
    updateCommentController.handle
)

/**
 * @swagger
 * /comment/movie:
 *   get:
 *     summary: Obter comentários de um filme por ID.
 *     tags: [Comments, Public]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               movieId:
 *                 type: integer
 *                 description: ID do filme.
 *             required:
 *               - movieId
 *     responses:
 *       200:
 *         description: Lista de comentários para o filme.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   movieId:
 *                     type: integer
 *                   userId:
 *                     type: string
 *                   comment:
 *                     type: string
 *       400:
 *         description: Validação falhou (e.g., ID do filme ausente ou inválido).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Validation error: The movieId is invalid or missing."
 *       404:
 *         description: Nenhum comentário encontrado para o filme especificado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No comments found for the movie."
 *       500:
 *         description: Erro interno no servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error."
 */
commentRouter.get("/",
    body("movieId").notEmpty().isInt().toInt().escape().withMessage("movieId cannot be null and must be a number"),
    validateFieldsOnRoutes,
    getCommentsByMovieIDController.handle
)

export { commentRouter };
