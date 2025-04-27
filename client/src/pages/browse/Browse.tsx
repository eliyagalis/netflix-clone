import React from 'react'
import CarouselFeature from '../../feature/landing/LandingCarouselFeature'
import MainCarousel from '../../feature/browse/MainCarousel'
import { movies } from '../../data/mock'
import LatestTrailer from '../../feature/browse/LatestTrailer'

const Browse = () => {
  return (
    <div className=''>
        {/* <LatestTrailer trailer={movies[0]}/> */}
        
        <MainCarousel title='Top 10' movies={movies}/>

        <MainCarousel title='Drama' movies={movies}/>
        <MainCarousel title='Action' movies={movies}/>
    </div>
  )
}

export default Browse