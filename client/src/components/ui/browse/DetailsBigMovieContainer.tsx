import React, { useEffect, useState } from 'react'
import MovieMediaType from './MovieMediaType';
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
  const containerBigWidth=window.innerWidth*1/3;
  useEffect(() => {
    setTimeout(() => {
      setIsBigger(false);
    },10000);

  }, [])
  
  return (
    <div className={`flex flex-col z-[999] text-start absolute transition-transform duration-300 ease-in ml-17 max-w-5/12
       w-${containerBigWidth}`}>
      <div className={` ${isBigger ? 'scale-100 translate-x-0 translate-y-0' : 'scale-60 -translate-x-11 translate-y-6 ease-in' }`}>
          <MovieMediaType biggerSize={isBigger} mediaType={mediaType}/>
          <TrailerName name={title} isBigger={isBigger}/>
          {isBigger&&(
            <Typography size={typography.medium} className='text-white text-left w-full Netflix Sans, Helvetica Neue, Segoe UI, Roboto, Ubuntu, sans-serif'>{description}</Typography>
          )}
          {/* //<MovieDetail/> */}
      </div>
        <div className={` max-w-5/6 items-start flex flex-row space-x-4 ${isBigger? "my-3":"my-0"}`}>
          <Button type='button' onClickFunc={()=>{}} className='bg-white rounded-md p-5 flex flex-row hover:opacity-' >
            <Typography size={typography.large} className='text-black'>Play</Typography>
            <i className='fa-solid fa-play'></i>
          </Button>
          {/* onClickFunc={()=>(<></>)} */}
          <Button type='button' onClickFunc={()=>{}} className='bg-gray-600 max-w-60 max-h-30 pl-8 opacity-50 rounded-md flex flex-row hover:opacity-20'>
            <Typography size={typography.large} className=' text-white hover:text-white'>More info</Typography>
            <span className='max-w-12 max-h-12'><IoIosInformationCircleOutline /></span>
          </Button>
        </div>

      
    </div>
  )
}

export default DetailsBigMovieContainer