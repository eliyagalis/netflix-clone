import React, { useEffect, useRef, useState } from 'react'
import TrailerMovie from '../../components/shared/TrailerMovie';
import PosterMovie from '../../components/shared/PosterMovie';
import { ICarouselCard } from '../../types/ICarouselCard';
import DetailsBigMovieContainer from '../../components/ui/browse/DetailsBigMovieContainer';
import PlayerOverlayContainer from '../../components/ui/browse/PlayerOverlayContainer';
import ReactPlayer from 'react-player';

type LatestTrailerProps = {
  trailer: ICarouselCard;
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
      const player = playerRef.current?.getInternalPlayer();
      if (!player) 
        return;
      if (player.isMuted()) {
        player.unMute();
        setIsMuted(false)
      } else {
        player.mute();
        setIsMuted(true);
      }
    }
  // //'https://www.youtube.com/watch?v=PMeHdc25BGE&pp=ygUFbW92aWU%3D'
  // const TrailerMovie: React.FC<TrailerMovieProps> = ({url,initialMuted,isPlaying=true,className,posterUrl}) => {
  return (
    <div className="relative w-full top-0 opacity-90 left-0 border-b-0" style={{ minHeight:containerTrailerHight, minWidth:containerTrailerWidth }}>
      {isPoster?
      (
        //isPlaying={isPoster}
        <TrailerMovie url='https://www.youtube.com/watch?v=PMeHdc25BGE&pp=ygUFbW92aWU%3D' playerRef={playerRef} />
      ):
      (
        <PosterMovie url="https://s.studiobinder.com/wp-content/uploads/2019/11/All-Marvel-Movies-in-Order-of-Release-Featured-StudioBinder-min.jpg" alt={`${trailer.title} image`} />
      )}
      <div className='absolute top-1/2 flex flex-row text-end z-[999] w-full justify-between'>
        <DetailsBigMovieContainer title='MOVIE' description='Lorem ipsum bala bala bala bala balalalaa dsfsdfsgr cdsvfdbfgthnhnhgnfvsfdgtbfdcsdefdx fefefefsfs' mediaType='movie'/>
      </div>
      <div>
        <PlayerOverlayContainer turnVolume={handleMuted} isMute={isMuted} ageLimit={Number(trailer.ageRating)} />

      </div>
    </div>
  )
}

export default LatestTrailerContainer