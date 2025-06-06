import React, { useEffect, useState } from 'react';
import { IMovieCard } from '../../../types/IMovieCard';
import { MoviePreviewInfo } from './MoviePreviewInfo';
import { ISeriesCard } from '../../../types/ISeriesCard';
import IMyListItem from '../../../types/IMyListItem';

interface MoviePreviewProps {
  preview: {
    movie: IMyListItem;
    x: number;
    y: number;
    width: number;
    height: number;
  };
  scale: number;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  previewRef: React.RefObject<HTMLDivElement>;
}

export const MoviePreview: React.FC<MoviePreviewProps> = ({
  preview,
  scale,
  onMouseEnter,
  onMouseLeave,
  previewRef,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      ref={previewRef}
      className={`absolute z-20 rounded-sm overflow-hidden shadow-2xl 
                transition-transform duration-300 ease-in-out ${isVisible ? 'opacity-100 transform-none' : 'opacity-0 scale-95'}
                `}
      style={{
        left: preview.x + preview.width / 2 - (preview.width * 1.5) / 2,
        top: preview.y - preview.height / 2,
        width: preview.width * 1.5,
        height: 'auto',
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div style={{ width: '100%', height: preview.height * scale }}>
        <img
          src={preview.movie.backdrop || ""}
          alt={preview.movie.title}
          className="object-cover w-full h-full"
        />
      </div>

      <MoviePreviewInfo movie={preview.movie} />
    </div>
  );
};