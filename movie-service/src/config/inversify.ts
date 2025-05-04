import { Container } from "inversify";
import { TOKENS } from "../tokens";
import ITmdbService from "../interfaces/ITmdbService";
import { TMDBService } from "../services/tmdb.service";
import MovieController from "../controllers/movie.controller";
import GenreController from "../controllers/genre.controller";

const container = new Container();

// Register services
container.bind<ITmdbService>(TOKENS.ITmdbService).to(TMDBService);

// Register controllers
container.bind<MovieController>(TOKENS.MovieController).to(MovieController);
container.bind<GenreController>(TOKENS.GenreController).to(GenreController);

export default container;