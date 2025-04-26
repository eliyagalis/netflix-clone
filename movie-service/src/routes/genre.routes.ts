import { Router } from "express";
import container from "../config/inversify";
import MovieController from "../controllers/movie.controller";
import { TOKENS } from "../tokens";
// Genre routes
const genreRouter = Router();
const movieController = container.get<MovieController>(TOKENS.MovieController);

genreRouter.get('/:genreId', movieController.getMoviesByGenre.bind(movieController));
export default genreRouter;