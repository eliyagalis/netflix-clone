import { Movie } from '../../models/Movie';
import { movies } from '../../data/mock';
import Carousel from '../shared/Carousel';
import { useState } from 'react';
import FloatingWindow from '../shared/FloatingWindow';


const LandingCarouselFeature = ({ }) => {
  const [movieDetails, setMovieDetails] = useState<Movie | null>(null);

  return (
    <>
      {movieDetails &&
        <FloatingWindow movieDetails={movieDetails} setMovieDetails={setMovieDetails} />
      }

      <Carousel movies={movies} setFloatingPoster={(m: Movie) => setMovieDetails(m)} isIndexed />
      <br />
    </>
  )
}

export default LandingCarouselFeature