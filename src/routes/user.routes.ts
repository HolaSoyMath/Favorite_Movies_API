import { Router } from "express";
import { CreateUserController } from "../modules/users/useCases/createUser/CreateUserController";
import { LoginUserController } from "../modules/users/useCases/loginUser/LoginUserController";
import { body } from "express-validator";
import { validateFieldsOnRoutes } from "../utils/checkTypeParamOnRoute";
import { GetUserByIDController } from "../modules/users/useCases/getUserByID/getUserByIDController";
import { authenticateJWT } from "../utils/authJWT";

const createUserController = new CreateUserController();
const loginUserController = new LoginUserController();
const getUserByIDController = new GetUserByIDController();

const userRouter = Router();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Obtém informações do usuário autenticado.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dados do usuário retornados com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Não autorizado.
 */
userRouter.get(
    "/",
    authenticateJWT,
    validateFieldsOnRoutes,
    getUserByIDController.handle
);


/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Registra um novo usuário.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterUser'
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso.
 *       400:
 *         description: Erro de validação nos campos.
 *       409:
 *         description: Email ou login já utilizado.
 */
userRouter.post(
    "/register",
    body("name").notEmpty().escape().trim().withMessage("name can not be null"),
    body("surname")
        .notEmpty()
        .escape()
        .trim()
        .withMessage("surname can not be null"),
    body("email")
        .isEmail()
        .escape()
        .trim()
        .withMessage("email must be a valid email"),
    body("login")
        .notEmpty()
        .escape()
        .trim()
        .withMessage("login can not be null"),
    body("password")
        .notEmpty()
        .escape()
        .trim()
        .withMessage("password can not be null"),
    validateFieldsOnRoutes,
    createUserController.handle
);

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Faz login do usuário.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginUser'
 *     responses:
 *       200:
 *         description: Login bem-sucedido.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT Token.
 *       401:
 *         description: Credenciais inválidas ou senha incorreta.
 *       404:
 *         description: Usuário não encontrado.
 */
userRouter.post(
    "/login",
    body("login")
        .notEmpty()
        .escape()
        .trim()
        .withMessage("login can not be null"),
    body("password")
        .notEmpty()
        .escape()
        .trim()
        .withMessage("password can not be null"),
    validateFieldsOnRoutes,
    loginUserController.handle
);

export { userRouter };
