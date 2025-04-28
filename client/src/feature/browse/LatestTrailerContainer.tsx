import React, { useEffect, useState } from 'react'
import TrailerMovie from '../../components/shared/TrailerMovie';
import PosterMovie from '../../components/shared/PosterMovie';
import { ICarouselCard } from '../../types/ICarouselCard';

type LatestTrailerProps = {
  trailer: ICarouselCard;
}

const LatestTrailerContainer:React.FC<LatestTrailerProps> = ({trailer}) => {
  const [isPoster, setIsPoster] = useState(false);
  const [containerTrailerWidth, setContainerTrailerWidth] = useState(0);
  const [containerTrailerHight, setContainerTrailerHight] = useState(0);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    setTimeout(()=>{
      setIsPoster(true);
    },6000)
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
    setIsMuted(!isMuted);
  }
  // //'https://www.youtube.com/watch?v=PMeHdc25BGE&pp=ygUFbW92aWU%3D'
  // const TrailerMovie: React.FC<TrailerMovieProps> = ({url,initialMuted,isPlaying=true,className,posterUrl}) => {
  return (
    <div className="relative w-full top-0 opacity-90 left-0" style={{ minHeight:containerTrailerHight, minWidth:containerTrailerWidth }}>
      {isPoster?
      (
        //isPlaying={isPoster}
        <TrailerMovie url='https://www.youtube.com/watch?v=PMeHdc25BGE&pp=ygUFbW92aWU%3D' initialMuted={isMuted} />
      ):
      (
        <PosterMovie url="https://s.studiobinder.com/wp-content/uploads/2019/11/All-Marvel-Movies-in-Order-of-Release-Featured-StudioBinder-min.jpg" alt={`${trailer.title} image`} />
      )}
    
    </div>
  )
}

export default LatestTrailerContainer