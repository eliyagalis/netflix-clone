// src/config/inversify.ts (updated)
import { Container } from "inversify";
import "reflect-metadata";
import MovieController from "../controllers/movie.controller";
import GenreController from "../controllers/genre.controller";
import { TMDBService } from "../services/tmdb.service";
import ITmdbService from "../interfaces/ITmdbService";
import { TOKENS } from "../tokens";

export const container = new Container();

// Services
container.bind<ITmdbService>(TOKENS.ITmdbService).to(TMDBService).inSingletonScope();

// Controllers
container.bind<MovieController>(TOKENS.MovieController).to(MovieController);
container.bind<GenreController>(TOKENS.GenreController).to(GenreController);

export default container;