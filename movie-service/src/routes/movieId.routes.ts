import { Router } from "express";
import  MovieController  from "../controllers/movie.controller";
import container from "../config/inversify";
import { TOKENS } from "../tokens";
const movieController = container.get<MovieController>(TOKENS.MovieController);

const movieIdRouter = Router({ mergeParams: true });
movieIdRouter.get('/', movieController.getMovieDetails.bind(movieController));
movieIdRouter.get('/similar', movieController.getSimilarMovies.bind(movieController));
export default movieIdRouter