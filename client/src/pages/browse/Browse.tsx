import React from 'react'
import MainCarousel from '../../feature/browse/MainCarousel'
import { movies } from '../../data/mock'
import LatestTrailerContainer from '../../feature/browse/LatestTrailerContainer'

const Browse = () => {
  return (
    <div>
        <LatestTrailerContainer trailer={movies[0]}/>
    <div className=''>
        {/* <LatestTrailer trailer={movies[0]}/> */}
        
        <MainCarousel title='Top 10' movies={movies}/>

        <MainCarousel title='Drama' movies={movies}/>
        <MainCarousel title='Action' movies={movies}/>
    </div>
  </div>
  )
}

export default Browse