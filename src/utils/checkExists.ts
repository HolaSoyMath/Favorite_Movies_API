import { Comment, Prisma, Rating } from "@prisma/client";
import { AppError } from "../errors/AppError";
import { prisma } from "../prisma/client";
import { axiosInstanceTMDB } from "./axiosInstance";

// Função para verificar se o Email já existe
export async function checkEmailExists(email: string) {
    const emailAlreadyExists = await prisma.user.findUnique({
        where: { email },
    });
    if (emailAlreadyExists) {
        throw new AppError("Email already exists");
    }
}

// Função para verificar se o login já existe
export async function checkLoginExists(login: string) {
    const loginAlreadyExists = await prisma.user.findUnique({
        where: { login },
    });
    if (loginAlreadyExists) {
        throw new AppError("Login already exists");
    }
}

// Função para verificar se o ID de usuário existe já existe
export async function checkIdUserExists(userId: string) {
    const userIdExists = await prisma.user.findUnique({
        where: { id: userId },
    });
    if (!userIdExists) {
        throw new AppError("IDUser not found", 404);
    }
}

// Função para verificar se o login já existe
export async function checkIdMovieExistsOnTmdb(movieId: number) {
    const movieExists = await axiosInstanceTMDB.get(`/movie/${movieId}`);
    if (!movieExists) {
        throw new AppError("Movie on TMDB not found exists", 404);
    }
}

// Função para verificar se um rating já existe para um filme
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
export async function checkCommentDuplicated(userId: string, movieId: number, comment: string): Promise<void> {
    const result = await prisma.comment.findFirst({
        where: {
            id_user: userId,
            id_movie: Number(movieId),
            comment: comment
        }
    });

    if (result) {
        throw new AppError("The comment is duplicated.");
    }

    return
}

// Função para verificar se o filme possui comentários
export async function checkCommentsForTheMovie(movieId: number): Promise<Comment[]> {
    const result = await prisma.comment.findMany({
        where: {
            id_movie: Number(movieId),
        }
    });
    
    return result;

}