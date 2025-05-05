import IMyListItem from "../types/IMyListItem";
import api from "./api";

export const getPopularMoviesRequest = async (): Promise<IMyListItem[]> => {
    const { data } = await api.get<any>("/api/v1/movies/popular");
    return data.results;
  };
  
  // Get top-rated movies
  export const getTopRatedMoviesRequest = async (): Promise<IMyListItem[]> => {
    const { data } = await api.get<any>("/api/v1/movies/top-rated");
    return data.results;
  };
  
  // Get upcoming movies
  export const getUpcomingMoviesRequest = async (): Promise<IMyListItem[]> => {
    const { data } = await api.get<any>("/api/v1/movies/upcoming");
    return data.results;
  };
  
  // Search movies
  export const searchMoviesRequest = async (query: string): Promise<IMyListItem[]> => {
    const { data } = await api.get<any>("/api/v1/movies/search", {
      params: { query },
    });
    return data.results;
  };
  
  // Multi-search (search movies, TV shows, etc.)
  export const multiSearchRequest = async (query: string): Promise<IMyListItem> => {
    const { data } = await api.get<any>("/api/v1/movies/search/multi", {
      params: { query },
    });
    return data.results;
  };
  
  // Get movie details by ID
  export const getMovieDetailsRequest = async (id: number): Promise<any> => {
    const { data } = await api.get<any>(`/api/v1/movies/title/${id}`);
    return data;
  };
  
  // Get similar movies by movie ID
  export const getSimilarMoviesRequest = async (id: number): Promise<IMyListItem[]> => {
    const { data } = await api.get<any>(`/api/v1/movies/title/${id}/similar`);
    return data.results;
  };

  