import { Comment } from "@prisma/client";
import { checkCommentsForTheMovie } from "../../../../utils/checkExists";

export class GetCommentsByMovieIDUseCase{
    async execute (movieId: number): Promise<Comment[]>{
        const commentsMovie = await checkCommentsForTheMovie(movieId);
        return commentsMovie;
    }
}