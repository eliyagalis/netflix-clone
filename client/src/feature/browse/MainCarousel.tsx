import React, { useRef, useState, MouseEvent } from 'react';
import { Movie } from '../../models/Movie';
import Typography from '../../components/shared/Typography';
import { typography } from '../../data/typography';

type CarouselProps = {
    movies: Movie[];
    isIndexed?: boolean
    title: string;
};
const SCALE = 1.25;

export default function MainCarousel({ movies, isIndexed, title }: CarouselProps) {
    const carouselRef = useRef<HTMLDivElement>(null);

    const [preview, setPreview] = useState<{
        movie: Movie;
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
        (movie: Movie) => (e: MouseEvent<HTMLDivElement>) => {
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
                                <img src={m.src} alt={m.title} className="object-cover w-full h-full" />
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
                        className="absolute z-[1000] rounded-sm overflow-hidden shadow-2xl
               transition-transform duration-100 pointer-events-auto"
                        style={{
                            left: preview.x + preview.width / 2 - (preview.width * SCALE) / 2,
                            top: preview.y - preview.height,
                            width: preview.width * SCALE,
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
                                src={preview.movie.src}
                                alt={preview.movie.title}
                                className="object-cover w-full h-full"
                            />
                        </div>

                        {/* info card */}
                        <div className="w-full bg-[#181818] p-4">
                            <h3 className="text-white text-lg font-bold">{preview.movie.title}</h3>
                            <p className="text-gray-400 text-sm">{preview.movie.description}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
