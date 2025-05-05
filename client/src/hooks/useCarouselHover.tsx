import { useRef, useState, MouseEvent, useEffect } from 'react';
import { IMovieCard } from '../types/IMovieCard';
import { ISeriesCard } from '../types/ISeriesCard';
import IMyListItem from '../types/IMyListItem';

interface UseCarouselHoverProps {
  carouselRef: React.RefObject<HTMLDivElement>;
}

interface PreviewState {
  movie: IMyListItem;
  x: number;
  y: number;
  width: number;
  height: number;
}

export const useCarouselHover = ({ carouselRef }: UseCarouselHoverProps) => {
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const currentHoveredCardRef = useRef<string | null>(null);
  const previewRef = useRef<HTMLDivElement | any>(null);

  const [preview, setPreview] = useState<PreviewState | null>(null);
  const [isHoveringPreview, setHoveringPreview] = useState(false);
  const [isHoveringCard, setHoveringCard] = useState(false);

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  // Handle preview visibility with debounce
  useEffect(() => {
    if (!isHoveringCard && !isHoveringPreview) {
      const timer = setTimeout(() => {
        setPreview(null);
      }, 50); // Small delay to prevent flicker
      return () => clearTimeout(timer);
    }
  }, [isHoveringCard, isHoveringPreview]);

  const handleEnterTile = (movie: IMyListItem) => (e: MouseEvent<HTMLDivElement>) => {
    if (!carouselRef.current) return;
    
    // Clear any existing timeout
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    
    setHoveringCard(true);
    
    // Set the current hovered card ID
    const movieId = movie.title; // Using title as ID
    currentHoveredCardRef.current = movieId;

    const trackRect = carouselRef.current.getBoundingClientRect();
    const tileRect = e.currentTarget.getBoundingClientRect();
    
    hoverTimeoutRef.current = setTimeout(() => {
      if (currentHoveredCardRef.current === movieId) {
        setPreview({
          movie,
          x: tileRect.left - trackRect.left,
          y: tileRect.top - trackRect.top,
          width: tileRect.width,
          height: tileRect.height
        });
      }
      hoverTimeoutRef.current = null;
    }, 700);
  };

  const handleLeaveTile = () => {
    setHoveringCard(false);
    
    // Clear timeout if exists
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    
    currentHoveredCardRef.current = null;
  };

  const handleEnterPreview = () => {
    setHoveringPreview(true);
  };

  const handleLeavePreview = () => {
    setHoveringPreview(false);
  };

  return {
    preview,
    isHoveringPreview,
    isHoveringCard,
    previewRef,
    handleEnterTile,
    handleLeaveTile,
    handleEnterPreview,
    handleLeavePreview
  };
};