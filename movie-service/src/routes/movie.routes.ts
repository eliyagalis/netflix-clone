import { Request, Response, Router } from "express";
import container from "../config/inversify";
import { TOKENS } from "../tokens";
import MovieController from "../controllers/movie.controller";

const router: Router = Router();
const movieController = container.get<MovieController>(TOKENS.MovieController);

// Static routes for collections
router.get('/popular', (req: Request, res: Response) => {
    movieController.getPopularMovies(req, res);
});

router.get('/top-rated', (req: Request, res: Response) => {
    movieController.getTopRatedMovies(req, res);
});

router.get('/upcoming', (req: Request, res: Response) => {
    movieController.getUpcomingMovies(req, res);
});

router.get('/search', (req: Request, res: Response) => {
    movieController.searchMovies(req, res);
});

// Title route for individual movie details
router.get('/title/:id(\\d+)', (req: Request, res: Response) => {
    movieController.getMovieDetails(req, res);
});

// Similar movies route
router.get('/title/:id(\\d+)/similar', (req: Request, res: Response) => {
    movieController.getSimilarMovies(req, res);
});

export default router;