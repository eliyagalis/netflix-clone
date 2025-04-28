import { movies } from '../../data/mock';
import Carousel from '../../components/shared/Carousel';
import { useState } from 'react';
import FloatingWindow from '../../components/shared/FloatingWindow';
import { ICarouselCard } from '../../types/ICarouselCard';


const LandingCarouselFeature = ({ }) => {
  const [movieDetails, setMovieDetails] = useState<ICarouselCard | null>(null);

  return (
    <>
      {movieDetails &&
        <FloatingWindow movieDetails={movieDetails} setMovieDetails={setMovieDetails} />
      }

      <Carousel movies={movies} setFloatingPoster={(m: ICarouselCard) => setMovieDetails(m)} isIndexed />
      <br />
    </>
  )
}

export default LandingCarouselFeature