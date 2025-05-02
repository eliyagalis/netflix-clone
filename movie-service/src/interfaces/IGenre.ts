export interface IGenre {
    id: number;
    name: string;
    mediaType: 'movie' | 'tv'; // To distinguish between movie and TV show genres
  }

  export interface GenreListResponse {
    genres: IGenre[];
  }