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
export async function checkIdMovieHaveRatingForTheUser(movieId: number,userId: string) {
    const ratingExists = await prisma.rating.findFirst({
        where: {
            id_user: userId,
            id_movie: movieId
        }
    });
    
    if(ratingExists?.id){
        throw new AppError("A rating already exists for this movie and user.", 409);
    }
}
