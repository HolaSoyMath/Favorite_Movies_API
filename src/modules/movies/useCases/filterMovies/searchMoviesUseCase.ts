import { axiosInstanceTMDB } from "../../../../utils/axiosInstance";

export class SearchMoviesUseCase {
    async execute(search: String, page: Number): Promise<void> {
        const result = await axiosInstanceTMDB.get("/search/movie", {
            params: {
                query: {
                    search,
                    page
                }
            },
        });
        return result.data;
    }
}
