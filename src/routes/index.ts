import { Router } from "express";
import { userRouter } from "./user.routes";
import { moviesRouter } from "./movies.routes";
import { favoriteRouter } from "./favorites.routes";
import { ratingRouter } from "./rating.routes";
import { commentRouter } from "./comment.routes";

const routes = Router();

routes.use("/users", userRouter);
routes.use("/movies", moviesRouter);
routes.use("/favorite", favoriteRouter);
routes.use("/rating", ratingRouter);
routes.use("/comment", commentRouter)

export { routes };