import React, { useEffect, useState } from 'react'
import MovieMediaType from './MovieMediaType';
import { setTimeout } from 'node:timers';
import Typography from '../../shared/Typography';
import { typography } from '../../../data/typography';
import TrailerName from './TrailerName';
import Button from '../../shared/Button';
import { IoIosInformationCircleOutline } from "react-icons/io";
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
    <div className='flex flex-col z-[999]'>
      <MovieMediaType biggerSize={isBigger} mediaType={mediaType}/>
      <TrailerName name={title} isBigger={isBigger}/>
      {isBigger&&(
        <Typography size={typography.medium} className='text-white'>{description}</Typography>
      )}
      {/* //<MovieDetail/> */}
      <Button type='button' onClickFunc={()=>{}} className='bg-white rounded-md flex flex-row hover:opacity-50' >
        <Typography size={typography.large} className='text-black'>Play</Typography>
        <i className='fa-solid fa-play'></i>
      </Button>
      {/* onClickFunc={()=>(<></>)} */}
      <Button type='button' onClickFunc={()=>{}} className='bg-gray-600 opacity-20 rounded-md flex flex-row hover:opacity-70' >
        <Typography size={typography.large} className='text-black'>More info</Typography>
        <span><IoIosInformationCircleOutline /></span>
      </Button>
    </div>
  )
}

export default DetailsBigMovieContainer