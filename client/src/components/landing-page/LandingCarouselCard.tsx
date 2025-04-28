import React from 'react'
import { ICarouselCard } from '../../types/ICarouselCard';

type LandingCarouselCardProps = {
    m: ICarouselCard;
    index: number;
    setFloatingPoster: Function;
}

const LandingCarouselCard:React.FC<LandingCarouselCardProps> = ({m, index, setFloatingPoster}) => {
  return (
    <div 
    className="relative pl-4 carousel-item overflow-hidden transition-transform duration-300 
    hover:scale-110 will-change-transform cursor-pointer" 
    key={m.id} 
    onClick={() => setFloatingPoster(m)}
>
    <img src={m.imageUrl} className="rounded-3xl object-cover w-[80%]" />
    
    <div className="absolute top-0 font-bold">
        <span className="absolute font-black text-black text-[4.5rem] -left-4 myStroke">
            {index + 1}
        </span>
    </div> 
</div>
  )
}

export default LandingCarouselCard