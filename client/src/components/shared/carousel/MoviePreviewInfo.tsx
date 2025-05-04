import React from 'react';
import { IMovieCard } from '../../../types/IMovieCard';
import Play from '../../../assets/netflix-buttons-svgs/Play';
import Add from '../../../assets/netflix-buttons-svgs/Add';
import Like from '../../../assets/netflix-buttons-svgs/Like';
import More from '../../../assets/netflix-buttons-svgs/More';
import Added from '../../../assets/netflix-buttons-svgs/Added'; // Make sure you have this icon
import IMyListItem from '../../../types/IMyListItem';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { addToProfileListRequest, removeFromProfileListRequest } from '../../../api/profilesApi';
import { useAuthStatus } from '../../../hooks/useAuthStatus';
import { addMovieToList, removeMovieFromList } from '../../../store/slices/profilesSlice';

interface MoviePreviewInfoProps {
  movie: IMyListItem;
}

export const MoviePreviewInfo: React.FC<MoviePreviewInfoProps> = ({ movie }) => {
  const { loading } = useAuthStatus();
  const currentProfile = useAppSelector((state) => state.profiles.currentProfile);
  const dispatch = useAppDispatch();


  // Block usage if loading
  if (loading) {
    return null; // or a loading spinner
  }

  if (!currentProfile) {
    return <div className="text-white">No profile found</div>;
  }


  const addToMyListHandler = async (movie: IMyListItem) => {
    try {
      const temp:any = currentProfile;
      await addToProfileListRequest(temp.id || temp._id || " ", movie);
      dispatch(addMovieToList(movie));
      console.log('Added to list');
    } catch (error) {
      console.error('Failed to add to list', error);
    } finally {

    }
  };

  const removeFromMyListHandler = async (movie: IMyListItem) => {
    try {
      const temp:any = currentProfile;
      await removeFromProfileListRequest(temp.id || temp._id || " ", movie.contentId);
      dispatch(removeMovieFromList(movie.contentId));     
    } catch (error) {
      console.error('Failed to remove from list', error);
    }
  };

  return (
    <div className="w-full bg-[#181818] p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Play />
          {currentProfile.myList.includes(movie) ? (
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