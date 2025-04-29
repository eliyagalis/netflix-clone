import { IMovieCard } from "./IMovieCard";
import { ISeriesCard } from "./ISeriesCard";

interface IMediaType{
    title: string;
}
export interface IMovieList extends IMediaType{
    movies: IMovieCard[];
}

export interface ISeriesList extends IMediaType {
    series: ISeriesCard[];
}
export interface IMediaList extends IMovieList,ISeriesList{
    movieAndSeries: (IMovieList | ISeriesList)[];
}