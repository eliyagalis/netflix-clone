import { Request, Response, Router } from "express";
import movieIdRouter from "./movieId.routes";
import container from "../config/inversify";
import { TOKENS } from "../tokens";
import MovieController from "../controllers/movie.controller";

const router: Router = Router();
const movieController = container.get<MovieController>(TOKENS.MovieController);

// Static routes
//router.get('/popular', movieController.getPopularMovies.bind(movieController));

router.get('/popular', movieController.getPopularMovies.bind(movieController));
router.get('/top-rated', movieController.getTopRatedMovies.bind(movieController));
// router.get('/now-playing', movieController.getNowPlayingMovies.bind(movieController));
router.get('/upcoming', movieController.getUpcomingMovies.bind(movieController));
router.get('/search', movieController.searchMovies.bind(movieController));
router.use('/:id', movieIdRouter);


export default router;