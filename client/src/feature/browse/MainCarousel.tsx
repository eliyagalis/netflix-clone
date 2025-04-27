import React, { useRef } from 'react';
import Typography from '../../components/shared/Typography';
import { typography } from '../../data/typography';
import { IMovieCard } from '../../types/IMovieCard';
import { CarouselArrow } from '../../components/shared/carousel/CarouselArrow';
import { CarouselItem } from '../../components/shared/carousel/CarouselItem';
import { MoviePreview } from '../../components/shared/carousel/MoviePreview';
import { useCarouselHover } from '../../hooks/useCarouselHover';

type CarouselProps = {
    movies: IMovieCard[];
    isIndexed?: boolean;
    title: string;
};

const SCALE = 1.25;

export default function MainCarousel({ movies, isIndexed, title }: CarouselProps) {
    const carouselRef = useRef<HTMLDivElement | any>(null);

    const {
        preview,
        previewRef,
        handleEnterTile,
        handleLeaveTile,
        handleEnterPreview,
        handleLeavePreview
    } = useCarouselHover({ carouselRef });

    /* scrolling */
    const scrollCarousel = (dir: 'left' | 'right') =>
        carouselRef.current?.scrollBy({
            left: dir === 'left' ? -100 : 100,
            behavior: 'smooth'
        });

    return (
        <div className='my-5'>
            <Typography size={`${typography.small}`} className='font-semibold'>{title}</Typography>
            <div className="relative flex items-center px-0">
                {/* Left arrow */}
                <CarouselArrow direction="left" onClick={() => scrollCarousel('left')} />

                {/* track */}
                <div
                    ref={carouselRef}
                    className="carousel overflow-visible overflow-x-scroll flex snap-x snap-mandatory p-2 py-5"
                >
                    {movies.map((movie, idx) => (
                        <CarouselItem
                            key={movie.title}
                            item={movie}
                            index={idx}
                            isIndexed={isIndexed}
                            onMouseEnter={handleEnterTile}
                            onMouseLeave={handleLeaveTile}
                        />
                    ))}
                </div>

                {/* Right arrow */}
                <CarouselArrow direction="right" onClick={() => scrollCarousel('right')} />

                {/* Preview */}
                {preview && (
                    <MoviePreview
                        preview={preview}
                        scale={SCALE}
                        onMouseEnter={handleEnterPreview}
                        onMouseLeave={handleLeavePreview}
                        previewRef={previewRef}
                    />
                )}
            </div>
        </div>
    );
}