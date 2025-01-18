import axios from "axios";
import { axiosInstanceTMDB } from "../../../../utils/axiosInstance";

export class GetInitialMoviesUseCase {
    async execute(page: number): Promise<void> {
        const result = await axiosInstanceTMDB.get("/discover/movie", {
            params: {
                include_adult: false,
                include_video: true,
                language: "pt-BR",
                page: page,
                sort_by: "popularity.desc",
            },
        });
        return result.data;
    }
}
