// src/routes/movie.routes.ts (updated)
import { Request, Response, Router } from "express";
import  container  from "../config/inversify";
import { TOKENS } from "../tokens";
import MovieController from "../controllers/movie.controller";

const router: Router = Router();
const movieController = container.get<MovieController>(TOKENS.MovieController);

// Static collection routes
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

// Multi-search endpoint (can be part of movie routes)
router.get('/search/multi', (req: Request, res: Response) => {
    movieController.multiSearch(req, res);
});

// Netflix-style title routes
router.get('/title/:id(\\d+)', (req: Request, res: Response) => {
    movieController.getMovieDetails(req, res);
});

router.get('/title/:id(\\d+)/similar', (req: Request, res: Response) => {
    movieController.getSimilarMovies(req, res);
});

export default router;