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


userRouter.get(
    "/",
    authenticateJWT,
    validateFieldsOnRoutes,
    getUserByIDController.handle
);

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
