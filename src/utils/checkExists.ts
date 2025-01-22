import { Comment, Prisma, Rating } from "@prisma/client";
import { AppError } from "../errors/AppError";
import { prisma } from "../prisma/client";
import { axiosInstanceTMDB } from "./axiosInstance";

// Função para verificar se o Email já existe
/**
 * @swagger
 * components:
 *   schemas:
 *     EmailExistsError:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: "Email already exists"
 */
export async function checkEmailExists(email: string) {
    const emailAlreadyExists = await prisma.user.findUnique({
        where: { email },
    });
    if (emailAlreadyExists) {
        throw new AppError("Email already exists", 400);
    }
}

// Função para verificar se o login já existe
/**
 * @swagger
 * components:
 *   schemas:
 *     LoginExistsError:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: "Login already exists"
 */
export async function checkLoginExists(login: string) {
    const loginAlreadyExists = await prisma.user.findUnique({
        where: { login },
    });
    if (loginAlreadyExists) {
        throw new AppError("Login already exists", 400);
    }
}

// Função para verificar se o ID de usuário existe já existe
/**
 * @swagger
 * components:
 *   schemas:
 *     CheckIdUser:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: "IDUser not found"
 *         statusCode:
 *           type: integer
 *           example: 404
 */
export async function checkIdUserExists(userId: string) {
    const userIdExists = await prisma.user.findUnique({
        where: { id: userId },
    });
    if (!userIdExists) {
        throw new AppError("IDUser not found", 404);
    }
}

// Função para verificar se o login já existe
/**
 * @swagger
 * components:
 *   schemas:
 *     MovieNotFoundOnTMDB:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: "Movie on TMDB not found"
 *         statusCode:
 *           type: integer
 *           example: 404
 */
export async function checkIdMovieExistsOnTmdb(movieId: number) {
    const movieExists = await axiosInstanceTMDB.get(`/movie/${movieId}`);
    if (!movieExists) {
        throw new AppError("Movie on TMDB not found exists", 404);
    }
}

// Função para verificar se um rating já existe para um filme
/**
 * @swagger
 * components:
 *   schemas:
 *     RatingResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         id_user:
 *           type: string
 *           example: "d76a6124-e608-4757-af9f-65f87bba8d98"
 *         id_movie:
 *           type: integer
 *           example: 950387
 *         rating:
 *           type: integer
 *           example: 4
 *         comment:
 *           type: string
 *           example: "Great movie!"
 */
export async function checkIdMovieHaveRatingForTheUser(
    userId: string,
    movieId: number
): Promise<Rating | null> {
    const ratingExists = await prisma.rating.findFirst({
        where: {
            id_user: userId,
            id_movie: Number(movieId),
        },
    });

    return ratingExists;
}

// Função para verificar o comentário criado pelo usuário
/**
 * @swagger
 * components:
 *   schemas:
 *     CommentNotFoundForUser:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: "The comment was not found for this user."
 *         statusCode:
 *           type: integer
 *           example: 404
 */
export async function checkCommentCreatedByUser(userId: string, commentId: number): Promise<Comment> {
    const result = await prisma.comment.findUnique({
        where: {
            id: commentId,
            id_user: userId,
        },
    });

    if (!result) {
        throw new AppError("The comment was not found for this user.", 404);
    };

    return result;
}

// Função para verificar se o comentário é duplicado
/**
 * @swagger
 * components:
 *   schemas:
 *     CommentDuplicatedError:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: "The comment is duplicated."
 *         statusCode:
 *           type: integer
 *           example: 400
 */
export async function checkCommentDuplicated(userId: string, movieId: number, comment: string): Promise<void> {
    const result = await prisma.comment.findFirst({
        where: {
            id_user: userId,
            id_movie: Number(movieId),
            comment: comment
        }
    });

    if (result) {
        throw new AppError("The comment is duplicated.", 400);
    }

    return
}

// Função para verificar se o filme possui comentários
/**
 * @swagger
 * components:
 *   schemas:
 *     CommentsForMovie:
 *       type: array
 *       items:
 *         type: object
 *         properties:
 *           id:
 *             type: integer
 *             example: 1
 *           id_user:
 *             type: string
 *             example: "d76a6124-e608-4757-af9f-65f87bba8d98"
 *           id_movie:
 *             type: integer
 *             example: 950387
 *           comment:
 *             type: string
 *             example: "Great movie!"
 */
export async function checkCommentsForTheMovie(movieId: number): Promise<Comment[]> {
    const result = await prisma.comment.findMany({
        where: {
            id_movie: Number(movieId),
        }
    });
    
    return result;

}