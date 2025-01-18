import { Router } from "express";
import { userRoutes } from "./user.routes";
import { moviesRouter } from "./movies.routes";
import { favoriteRouter } from "./favorites.routes";
import { ratingRoutes } from "./rating.routes";

const routes = Router();

routes.use("/users", userRoutes);
routes.use("/movies", moviesRouter);
routes.use("/favorite", favoriteRouter);
routes.use("/rating", ratingRoutes);

export { routes };