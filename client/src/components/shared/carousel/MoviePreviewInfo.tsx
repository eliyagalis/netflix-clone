import React from 'react';
import { IMovieCard } from '../../../types/IMovieCard';
import Play from '../../../assets/netflix-buttons-svgs/Play';
import Add from '../../../assets/netflix-buttons-svgs/Add';
import Like from '../../../assets/netflix-buttons-svgs/Like';
import More from '../../../assets/netflix-buttons-svgs/More';
import Added from '../../../assets/netflix-buttons-svgs/Added'; // Make sure you have this icon
import IMyListItem from '../../../types/IMyListItem';
import { useAppSelector } from '../../../store/store';
import { addToProfileListRequest } from '../../../api/profilesApi';

interface MoviePreviewInfoProps {
  movie: IMyListItem;
}

export const MoviePreviewInfo: React.FC<MoviePreviewInfoProps> = ({ movie }) => {
  const { currentProfile } = useAppSelector((state) => state.profiles);

  const addToMyListHandler = async (movie: IMyListItem) => {
    try {
      await addToProfileListRequest( currentProfile?.id || "", movie );
      console.log('Added to list');
    } catch (error) {
      console.error('Failed to add to list', error);
    }
  };

  const removeFromMyListHandler = async (movie: IMyListItem) => {
    try {
      // Call your API or dispatch remove action here
      console.log('Removed from list:', movie);
    } catch (error) {
      console.error('Failed to remove from list', error);
    }
  };

  const isInMyList = currentProfile?.myList?.some((item) => item.contentId === movie.contentId);

  return (
    <div className="w-full bg-[#181818] p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Play />
          {isInMyList ? (
            <Added onClick={() => removeFromMyListHandler(movie)} />
          ) : (
            <Add onClick={() => addToMyListHandler(movie)} />
          )}
          <Like />
        </div>
        <More />
      </div>
      <div className="flex items-center m-2">
        <div className="px-2 border-[0.5px] border-[rgb(145,145,145)] w-fit">{movie.ageRestriction}</div>
        <div className="px-2 w-fit">{movie.type === 'movie' ? movie.runtime : `${movie.numberOfSeasons} seasons`}</div>
      </div>
      <div className="flex flex-wrap gap-2">
        {movie.genres.map((g, idx) => (
          <div key={g} className="w-fit flex items-center">
            <span>{g}</span>
            {idx !== movie.genres.length - 1 && (
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
