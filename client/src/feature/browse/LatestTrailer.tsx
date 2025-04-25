import React from 'react'
import { Movie } from '../../models/Movie'

type LatestTrailerProps = {
  trailer: Movie
}

const LatestTrailer:React.FC<LatestTrailerProps> = ({trailer}) => {
  return (
    <div>{trailer.src}</div>
  )
}

export default LatestTrailer