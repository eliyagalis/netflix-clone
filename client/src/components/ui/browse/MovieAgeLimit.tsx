import React from 'react'
import { typography } from '../../../data/typography';

type MovieAgeLimitProp={
    ageLimit:number;
}
const MovieAgeLimit:React.FC<MovieAgeLimitProp> = ({ageLimit}) => {
  return (
    <div className={`bg-gray-600 border-l-2 border-white flex flex-row pl-2 pr-2`}>
      <i className='fa-solid fa-plus text-white items-center pt-2'></i>
      <span className={`${typography.medium}`}>{ageLimit}</span>
    </div>
  )
}

export default MovieAgeLimit