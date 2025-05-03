import React from 'react'
import { MoviePreview } from '../shared/carousel/MoviePreview'


const MoviesFromSearchUI = ({movies}) => {
  return (
    <div className="z-[999] bg-black">
        <MoviePreview />

    </div>
  )
}

export default MoviesFromSearchUI