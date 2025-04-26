import { Container } from "inversify"
import MovieController from "../controllers/movie.controller"
import { TMDBService } from "../services/tmdb.service"
import ITmdbService from "../interfaces/ITmdbService";
import { TOKENS } from "../tokens";


const container = new Container();
container.bind<ITmdbService>(TOKENS.ITmdbService).to(TMDBService);
container.bind<MovieController>(TOKENS.MovieController).to(MovieController);

export default container;


