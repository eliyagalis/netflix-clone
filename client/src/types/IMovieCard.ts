import { ICarouselCard } from "./ICarouselCard";

export interface IMovieCard extends ICarouselCard {
    type: "Movie";
    duration: number;
    trailerUrl: string;
}
