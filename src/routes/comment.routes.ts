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

commentRouter.post(
    "/",
    authenticateJWT,
    body("movieId").notEmpty().isInt().toInt().escape().withMessage("movieId cannot be null and must be a number"),
    body("comment").notEmpty().escape().withMessage("comment cannot be null"),
    validateFieldsOnRoutes,
    addCommentController.handle
);

commentRouter.delete("/",
    authenticateJWT,
    body("commentId").isInt().toInt().notEmpty().withMessage("commentId can not be null and must be a number"),
    validateFieldsOnRoutes,
    deleteCommentController.handle
)

commentRouter.patch("/",
    authenticateJWT,
    body("commentId").isInt().toInt().notEmpty().withMessage("commentId can not be null and must be a number"),
    body("comment").notEmpty().escape().withMessage("comment cannot be null"),
    validateFieldsOnRoutes,
    updateCommentController.handle
)

commentRouter.get("/",
    body("movieId").notEmpty().isInt().toInt().escape().withMessage("movieId cannot be null and must be a number"),
    validateFieldsOnRoutes,
    getCommentsByMovieIDController.handle
)

export { commentRouter };
