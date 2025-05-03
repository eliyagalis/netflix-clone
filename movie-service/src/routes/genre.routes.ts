// src/routes/genre.routes.ts (updated)
import { Request, Response, Router } from "express";
import container from "../config/inversify";
import GenreController from "../controllers/genre.controller";
import { TOKENS } from "../tokens";

const router: Router = Router();
const genreController = container.get<GenreController>(TOKENS.GenreController);

// Get all genres
router.get('/', (req: Request, res: Response) => {
    genreController.getAllGenres(req, res);
});

// Get movie genres only
router.get('/movie', (req: Request, res: Response) => {
    genreController.getMovieGenres(req, res);
});

// Get TV show genres only
router.get('/tv', (req: Request, res: Response) => {
    genreController.getTvGenres(req, res);
});

// Netflix-style genre browsing
router.get('/:genreId(\\d+)', (req: Request, res: Response) => {
    genreController.getContentByGenre(req, res);
});

export default router;