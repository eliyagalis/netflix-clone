import React from 'react'
import CarouselFeature from '../../components/landing-page/LandingCarouselFeature'
import MainCarousel from '../../feature/browse/MainCarousel'
import { movies } from '../../data/mock'
import LatestTrailers from '../../feature/browse/LatestTrailers'

const Browse = () => {
  return (
    <div>
        <LatestTrailers  />
        <div>Title</div>
        <MainCarousel movies={movies}/>
        <MainCarousel movies={movies}/>
        <MainCarousel movies={movies}/>
        <MainCarousel movies={movies}/>
        <MainCarousel movies={movies}/>
    </div>
  )
}

export default Browse