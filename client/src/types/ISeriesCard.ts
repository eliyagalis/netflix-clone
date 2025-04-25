export interface ISeriesCard {
    id: number;
    title: string;
    imageUrl: string;
    releaseDate: string;
    ageRating: string;
    seasons: number;
    episodes?: number;
    genre: string[];
    trailerUrl: string;
}