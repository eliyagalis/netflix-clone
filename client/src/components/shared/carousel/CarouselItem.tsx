import React, { MouseEvent } from 'react';
import { IMovieCard } from '../../../types/IMovieCard';
import { ISeriesCard } from '../../../types/ISeriesCard';
import IMyListItem from '../../../types/IMyListItem';

interface CarouselItemProps {
  item: IMyListItem;
  index: number;
  isIndexed?: boolean;
  onMouseEnter: (movie: IMyListItem) => (e: MouseEvent<HTMLDivElement>) => void;
  onMouseLeave: () => void;
}

export const CarouselItem: React.FC<CarouselItemProps> = ({
  item,
  index,
  isIndexed,
  onMouseEnter,
  onMouseLeave,
}) => {
  return (
    <div
      key={item.title}
      onMouseEnter={onMouseEnter(item)}
      onMouseLeave={onMouseLeave}
      className="relative flex-none basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6 snap-start px-[2px] group z-10"
    >
      <div className="aspect-video w-full overflow-hidden shadow-lg rounded-sm 
                     transition-all duration-300 ease-in-out 
                     group-hover:scale-101 group-hover:z-20 group-hover:shadow-xl 
                     transform origin-center">
        <img src={item.poster || ""} alt={item.title} className="object-cover w-full h-full" />
      </div>

      {isIndexed && (
        <span className="absolute top-0 -left-4 font-black text-[4.5rem] text-black myStroke">
          {index + 1}
        </span>
      )}
    </div>
  );
};
