export interface ICarouselCard {
    id: number;
    imageUrl: string;
    title: string;
    description: string;
    releaseDate: string;
    ageRating: string;
    genre: string[];
    type: "Movie" | "Show";
}