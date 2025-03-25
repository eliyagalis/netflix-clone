import { Router } from "express";
import movieController from "../controllers/movie.controller";
// Genre routes
const genreRouter = Router();
genreRouter.get('/:genreId', movieController.getMoviesByGenre.bind(movieController));
export default genreRouter;