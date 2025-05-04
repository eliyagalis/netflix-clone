import React from 'react'
import { typography } from '../../../data/typography';

type MovieAgeLimitProp={
    ageLimit:number;
}
const MovieAgeLimit:React.FC<MovieAgeLimitProp> = ({ageLimit}) => {
  return (
    <div className={`bg-gray-600 border-r-2 border-white flex flex-row `}>
      <span className={`${typography.medium}`}>{ageLimit}</span>
      <i className='fa-solid fa-plus text-white'></i>
    </div>
  )
}

export default MovieAgeLimit