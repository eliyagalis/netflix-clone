import React, { useEffect, useRef, useState } from 'react'
import TrailerMovie from '../../components/shared/TrailerMovie';
import PosterMovie from '../../components/shared/PosterMovie';
import { ICarouselCard } from '../../types/ICarouselCard';
import DetailsBigMovieContainer from '../../components/ui/browse/DetailsBigMovieContainer';
import PlayerOverlayContainer from '../../components/ui/browse/PlayerOverlayContainer';
import ReactPlayer from 'react-player';
import IMyListItem from '../../types/IMyListItem';

type LatestTrailerProps = {
  trailer: IMyListItem;
}

const LatestTrailerContainer:React.FC<LatestTrailerProps> = ({trailer}) => {
  const [isPoster, setIsPoster] = useState(false);
  const [containerTrailerWidth, setContainerTrailerWidth] = useState(0);
  const [containerTrailerHight, setContainerTrailerHight] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const playerRef = useRef<ReactPlayer>(null);
  // const [isPlaying,setIsPlaying]=useState(false)
  useEffect(() => {
    
    setTimeout(()=>{
      setIsPoster(true);
    },5000)
    const updateSizeByScreen=()=>{
      // const width=window.innerWidth*0.90;

      const width=window.innerWidth*0.90;
      const height=width*(9/16);
      setContainerTrailerWidth(width);
      setContainerTrailerHight(Math.min(height, window.innerHeight*0.8));
    }
    updateSizeByScreen();
    window.addEventListener('resize',updateSizeByScreen);
    return () => {
      window.removeEventListener('resize',updateSizeByScreen);
    }
  }, [])
  
  const handleMuted=()=>{
      // const player = playerRef.current?.getInternalPlayer();
      // if (!player) 
      //   return;
      // if (player.isMuted()) {
      //   player.unMute();
      //   setIsMuted(false)
      // } else {
      //   player.mute();
      //   setIsMuted(true);
      // }
      if(isMuted){
        setIsMuted(false);
        return;
      }
      setIsMuted(true);
    }
  // //'https://www.youtube.com/watch?v=PMeHdc25BGE&pp=ygUFbW92aWU%3D'
  // const TrailerMovie: React.FC<TrailerMovieProps> = ({url,initialMuted,isPlaying=true,className,posterUrl}) => {
  return (
    <div className="relative w-full top-0 opacity-90 left-0 border-b-0" style={{ minHeight:containerTrailerHight, minWidth:containerTrailerWidth }}>
      {isPoster?
      (
        //isPlaying={isPoster}
        <TrailerMovie url='https://www.youtube.com/watch?v=PMeHdc25BGE&pp=ygUFbW92aWU%3D' isMute={isMuted} playerRef={playerRef} />
      ):
      (
        <PosterMovie className='w-full' url="https://resizing.flixster.com/tnpPlqni3WxsPYA_FTnZHGa6Pmg=/fit-in/705x460/v2/https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p26092215_v_h9_ab.jpg" alt={`${trailer.title} image`} />
      )}
      <div className='absolute top-1/2 flex flex-row text-end z-[999] w-full justify-between'>
        <DetailsBigMovieContainer title='Lost in Love' mediaType='movie'/>
      </div>
      <div>
        <PlayerOverlayContainer turnVolume={handleMuted} isMute={isMuted} ageLimit={Number(trailer.ageRestriction)} />

      </div>
    </div>
  )
}

export default LatestTrailerContainer