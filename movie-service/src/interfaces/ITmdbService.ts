import { MovieDetails, MovieResponse } from "./IMovieable";

export default interface ITmdbService{
    getPopularMovies(page?: number): Promise<MovieResponse>;
    getTopRatedMovies(page?: number): Promise<MovieResponse>;
    getUpcomingMovies(page?: number): Promise<MovieResponse>;
    getMovieDetails(movieId: number): Promise<MovieDetails>;
    searchMovies(query: string, page?: number): Promise<MovieResponse>;
    getMoviesByGenre(genreId: number, page?: number): Promise<MovieResponse>;
    getSimilarMovies(movieId: number, page?: number): Promise<MovieResponse>;
    getImageUrl(path: string | null, size?: string): string | null ;
}