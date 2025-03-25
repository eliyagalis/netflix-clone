import { Router } from "express";
import movieController from "../controllers/movie.controller";

const movieIdRouter = Router({ mergeParams: true });
movieIdRouter.get('/', movieController.getMovieDetails.bind(movieController));
movieIdRouter.get('/similar', movieController.getSimilarMovies.bind(movieController));
export default movieIdRouter