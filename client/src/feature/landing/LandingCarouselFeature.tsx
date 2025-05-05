import { useEffect, useState } from 'react';
import Carousel from '../../components/shared/Carousel';
import FloatingWindow from '../../components/shared/FloatingWindow';
import { ICarouselCard } from '../../types/ICarouselCard';
import IMyListItem from '../../types/IMyListItem';
import { getPopularMoviesRequest, getTopRatedMoviesRequest } from '../../api/moviesApi';

const LandingCarouselFeature = () => {
  const [movies, setMovies] = useState<IMyListItem[]>([]);
  const [movieDetails, setMovieDetails] = useState<string | null>(null);

  

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await getPopularMoviesRequest();
        setMovies(response);
      } catch (error) {
        console.error('Failed to fetch top-rated movies:', error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <>
      {movieDetails && (
        <FloatingWindow
          movieDetails={movieDetails || ""}
          setMovieDetails={setMovieDetails}
        />
      )}

      <Carousel
        movies={movies}
        setFloatingPoster={(m: IMyListItem) => setMovieDetails(m.contentId)}
        isIndexed
      />
      <br />
    </>
  );
};

export default LandingCarouselFeature;
