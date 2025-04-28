import React from 'react'
import { images } from '../../../data/images';
import { typography } from '../../../data/typography';

type MediaType={
    mediaType:string;
    biggerSize:boolean;
}
const MovieMediaType:React.FC<MediaType> = ({mediaType,biggerSize}) => {

  return (
    <div className='flex flex-row mx-2 text-left mx-10 p-5'>
        <img src={images.smallLogo.src} alt={images.smallLogo.alt} className='max-w-8 max-h-10'/>
        <span className={`text-white  ${biggerSize? typography.xlarge : typography.large} italic`}>{mediaType}</span>

    </div>
  )
}

export default MovieMediaType