import React from 'react'
import { images } from '../../../data/images';
import { typography } from '../../../data/typography';

type MediaType={
    mediaType:string;
    biggerSize:boolean;
}
const MovieMediaType:React.FC<MediaType> = ({mediaType,biggerSize}) => {

  return (
    <div className='flex flex-row mx-2 text-right'>
        <span className={`text-white  ${biggerSize? typography.medium : typography.xsmall}`}>{mediaType} fdfdfd</span>
        <img src={images.smallLogo.src} alt={images.smallLogo.alt} />
    </div>
  )
}

export default MovieMediaType