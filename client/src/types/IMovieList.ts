import { IMovieCard } from "./IMovieCard";

export interface IMovieList {
    title: string;
    movies: IMovieCard[];
}

export interface ISeriesList {
    title: string;
    series: IMovieCard[];
}