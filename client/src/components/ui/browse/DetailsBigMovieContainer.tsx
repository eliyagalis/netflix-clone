import React, { useEffect, useState } from 'react'
import MovieMediaType from './MovieMediaType';
import { setTimeout } from 'node:timers';

type MovieDetails={
    title:string;
    description:string;
    mediaType:string;
}
const DetailsBigMovieContainer:React.FC<MovieDetails> = ({title,description,mediaType}) => {
  const [isBigger, setIsBigger] = useState(true);
  useEffect(() => {
    setTimeout(()=>{
      setIsBigger(false);
    },5000)

  }, [])
  
  return (
    <div className='flex flex-col'>
      <MovieMediaType biggerSize={isBigger} mediaType={mediaType}/>
      <TrailerName name={title}/>
    </div>
  )
}

export default DetailsBigMovieContainer