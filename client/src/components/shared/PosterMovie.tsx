import React from 'react'

type PosterMovie={
    url:string;
    className?:string,
    alt:string;
}
const PosterMovie:React.FC<PosterMovie> = ({url,className,alt}) => {
  return (
    <>
        <img src={url} alt={alt} className={className|| ""} />    
    </>
  )
}

export default PosterMovie