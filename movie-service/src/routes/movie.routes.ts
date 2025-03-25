import { Request, Response, Router } from "express";
import movieController from '../controllers/movie.controller';
import movieIdRouter from "./movieId.routes";

const router: Router = Router();

// Static routes
router.get('/popular', movieController.getPopularMovies.bind(movieController));
router.get('/top-rated', movieController.getTopRatedMovies.bind(movieController));
// router.get('/now-playing', movieController.getNowPlayingMovies.bind(movieController));
router.get('/upcoming', movieController.getUpcomingMovies.bind(movieController));
router.get('/search', movieController.searchMovies.bind(movieController));

// Genre routes
// const genreRouter = Router();
// router.use('/genre', genreRouter);
// genreRouter.get('/:genreId', movieController.getMoviesByGenre.bind(movieController));

// Movie detail route
// router.get('/:id', movieController.getMovieDetails.bind(movieController));
// Similar movies route
router.use('/:id', movieIdRouter);



export default router;