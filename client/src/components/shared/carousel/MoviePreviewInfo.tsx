import React from 'react';
import { IMovieCard } from '../../../types/IMovieCard';
import Play from '../../../assets/netflix-buttons-svgs/Play';
import Add from '../../../assets/netflix-buttons-svgs/Add';
import Like from '../../../assets/netflix-buttons-svgs/Like';
import More from '../../../assets/netflix-buttons-svgs/More';

interface MoviePreviewInfoProps {
  movie: IMovieCard;
}

export const MoviePreviewInfo: React.FC<MoviePreviewInfoProps> = ({ movie }) => {
  return (
    <div className="w-full bg-[#181818] p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Play />
          <Add />
          <Like />
        </div>
        <More />
      </div>
      <div className="flex items-center m-2">
        <div className="px-2 border-[0.5px] border-[rgb(145,145,145)] w-fit">{movie.ageRating}</div>
        <div className="px-2 w-fit">{movie.duration}</div>
      </div>
      <div className="flex">
      {movie.genre.map((g, idx) => (
        <div key={g} className="w-fit flex items-center">
          <span>{g}</span>
          {idx !== movie.genre.length - 1 && (
            <span className="text-[rgb(145,145,145)] mx-3 flex items-center">
              <i className="text-[5px] fa-solid fa-circle" />
            </span>
          )}
        </div>
      ))}
    </div>
    </div>
  );
};
