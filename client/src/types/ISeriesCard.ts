import { ICarouselCard } from "./ICarouselCard";

export interface ISeriesCard extends ICarouselCard {
    type: "Show";
    seasons: number;
    episodes: number;
    genre: string[];
    trailerUrl: string;
}