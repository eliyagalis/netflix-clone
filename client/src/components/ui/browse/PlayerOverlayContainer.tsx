import React from 'react'
import VolumeIndicator from './VolumeIndicator';
import MovieAgeLimit from './MovieAgeLimit';
type PlayerOverlayContainerProps={
  turnVolume:()=>void;
  ageLimit:number;
  isMute:boolean
}
const PlayerOverlayContainer:React.FC<PlayerOverlayContainerProps>=({turnVolume,ageLimit,isMute}) => {

  return (
    <div className='absolute z-[999] top-1/2 flex flex-row items-end w-full justify-end  mt-31'>
      <VolumeIndicator isMute={isMute} onClickVolume={turnVolume} />
      <MovieAgeLimit ageLimit={ageLimit?ageLimit:16}/>

    </div>
  )
}

export default PlayerOverlayContainer