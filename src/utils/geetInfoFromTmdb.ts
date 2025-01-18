import { AppError } from "../errors/AppError";
import { axiosInstanceTMDB } from "./axiosInstance";

export async function getAllInfosMovie(movieId: number): Promise<void> {
    const movie = await axiosInstanceTMDB.get(`/movie/${movieId}`);
    if(movie.status === 404){
        throw new AppError("MovieID not found in TMDB", 404);
    }
    return movie.data;
}