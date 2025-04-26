import React, { useRef, useState, MouseEvent } from 'react';
import { Movie } from '../../models/Movie';
import Typography from '../../components/shared/Typography';
import { typography } from '../../data/typography';
import Play from '../../assets/netflix-buttons-svgs/Play';
import Add from '../../assets/netflix-buttons-svgs/Add';
import Like from '../../assets/netflix-buttons-svgs/Like';
import More from '../../assets/netflix-buttons-svgs/More';
import { IMovieCard } from '../../types/IMovieCard';

type CarouselProps = {
    movies: IMovieCard[];
    isIndexed?: boolean
    title: string;
};
const SCALE = 1.25;

export default function MainCarousel({ movies, isIndexed, title }: CarouselProps) {
    const carouselRef = useRef<HTMLDivElement>(null);

    const [preview, setPreview] = useState<{
        movie: IMovieCard;
        x: number;
        y: number;
        width: number;
        height: number;
    } | null>(null);

    const [isHoveringPreview, setHoveringPreview] = useState(false);

    /* scrolling */
    const scrollCarousel = (dir: 'left' | 'right') =>
        carouselRef.current?.scrollBy({
            left: dir === 'left' ? -100 : 100,
            behavior: 'smooth'
        });

    /* hover tile */
    const handleEnterTile =
        (movie: IMovieCard) => (e: MouseEvent<HTMLDivElement>) => {
            if (!carouselRef.current) return;

            const tileRect = e.currentTarget.getBoundingClientRect();
            const trackRect = carouselRef.current.getBoundingClientRect(); // ← container

            setPreview({
                movie,
                x: tileRect.left - trackRect.left,   // RELATIVE X
                y: tileRect.top - trackRect.top,    // RELATIVE Y
                width: tileRect.width,
                height: tileRect.height
            });
        };

    const handleLeaveTile = () => !isHoveringPreview && setPreview(null);

    return (
        <div className='my-5'>

            <Typography size={`${typography.small}`} className='font-semibold'>{title}</Typography>
            <div className="relative flex items-center px-0 ">
                {/* arrows */}
                <button
                    className="btn absolute -left-5 z-10 w-2 py-15 bg-[rgba(145,145,145,0.5)] shadow-none rounded-xl border-0 font-thin text-white text-2xl"
                    onClick={() => scrollCarousel('left')}
                >
                    <i className="fa-solid fa-chevron-left" />
                </button>

                {/* track */}
                <div
                    ref={carouselRef}
                    className="carousel overflow-visible overflow-x-scroll flex snap-x snap-mandatory p-2"
                >
                    {movies.map((m, idx) => (
                        <div
                            key={m.title}
                            onMouseEnter={handleEnterTile(m)}
                            onMouseLeave={handleLeaveTile}
                            className="relative flex-none basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6 snap-start px-[2px] group"
                        >
                            <div className="aspect-video w-full overflow-hidden shadow-lg rounded-sm">
                                <img src={m.imageUrl} alt={m.title} className="object-cover w-full h-full" />
                            </div>

                            {isIndexed && (
                                <span className="absolute top-0 -left-4 font-black text-[4.5rem] text-black myStroke">
                                    {idx + 1}
                                </span>
                            )}
                        </div>
                    ))}
                </div>

                <button
                    className="btn absolute -right-2 z-10 w-2 py-15 bg-[rgba(145,145,145,0.5)] shadow-none rounded-xl border-0 font-thin text-white text-2xl"
                    onClick={() => scrollCarousel('right')}
                >
                    <i className="fa-solid fa-chevron-right" />
                </button>

                {preview && (
                    <div
                        className="absolute z-10 rounded-sm overflow-hidden shadow-2xl
               transition-transform duration-100 pointer-events-auto"
                        style={{
                            left: preview.x + preview.width / 2 - (preview.width * 1.5) / 2,
                            top: preview.y - preview.height / 2,
                            width: preview.width * 1.5,
                            height: 'auto'
                        }}
                        onMouseEnter={() => setHoveringPreview(true)}
                        onMouseLeave={() => {
                            setHoveringPreview(false);
                            setPreview(null);
                        }}
                    >
                        {/* poster */}
                        <div style={{ width: '100%', height: preview.height * SCALE }}>
                            <img
                                src={preview.movie.imageUrl}
                                alt={preview.movie.title}
                                className="object-cover w-full h-full"
                            />
                        </div>

                        {/* info card */}
                        <div className="w-full bg-[#181818] p-4">


                            <div className='flex items-center justify-between'>
                                <div className='flex items-center gap-2'>
                                    <Play />
                                    <Add />
                                    <Like />
                                </div>
                                <More />
                            </div>
                            <div className='flex items-center m-2'>
                                <div className=' px-2 border-[0.5px] border-[rgb(145,145,145)] w-fit'>{preview.movie.ageRating}</div>
                                <div className='px-2 w-fit'>{preview.movie.duration}</div>
                            </div>
                            <div className="flex">
                                {preview.movie.genre.map((g, idx) => (
                                    <div key={g} className="w-fit flex items-center">
                                        <span>{g}</span>
                                        {idx !== preview.movie.genre.length - 1 && (
                                            <span className="text-[rgb(145,145,145)] mx-3 flex items-center">
                                                <i className="text-[5px] fa-solid fa-circle" />
                                            </span>
                                        )}
                                    </div>
                                ))}
                            </div>

                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
