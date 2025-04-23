import React, { useRef } from 'react'
import { Movie } from "../../models/Movie";

type CarouselProps = {
    movies: Array<Movie>;
    isIndexed?: boolean;
}

const MainCarousel: React.FC<CarouselProps> = ({ movies, isIndexed }) => {

    const carouselRef = useRef<HTMLDivElement>(null);
    const scrollCarousel = (direction: "left" | "right") => {
        if (carouselRef.current) {
            const scrollAmount = 700;
            carouselRef.current.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth"
            });
        }
    };

    return (
        <div className="relative flex items-center px-0">
            {/* Left Arrow */}
            <button
                className="btn absolute -left-0 z-10 w-2 py-15 bg-[rgba(145,145,145,0.5)] shadow-none rounded-xl border-0 font-thin text-white text-2xl"
                onClick={() => scrollCarousel("left")}
            >
                <i className="fa-solid fa-chevron-left"></i>
            </button>

            {/* Carousel */}
            <div
                ref={carouselRef}
                className="carousel overflow-y-visible overflow-x-scroll scroll-smooth p-5 py-10 flex snap-x snap-mandatory"            >
                {movies.map((m, idx) => (
                    <div
                    key={m.title}
                    className="relative flex-none basis-1/6 snap-start px-2 group"
                  >
                    {/* fixed‑size placeholder keeps the row stable */}
                    <div className="aspect-video w-full overflow-hidden rounded-xl shadow-lg">
                      <img
                        src={m.src}
                        alt={m.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  
                    {/* ▲ The *preview* that appears on hover */}
                    <div
                      className="absolute inset-0 origin-bottom z-50
                                 scale-100 opacity-0 pointer-events-none
                                 transition duration-300 ease-out
                                 group-hover:scale-125 group-hover:-translate-y-0
                                 group-hover:opacity-100 group-hover:z-20"
                    >
                      <img
                        src={m.src}
                        alt={m.title}
                        className="h-full w-full object-cover rounded-xl shadow-2xl"
                      />
                    </div>
                  
                    {isIndexed && (
                      <span className="absolute top-0 -left-4 font-black text-[4.5rem] text-black myStroke">
                        {idx + 1}
                      </span>
                    )}
                  </div>
                  
                ))}
            </div>

            {/* Right Arrow */}
            <button
                className="btn absolute -right-0 z-10 w-2 py-15 bg-[rgba(145,145,145,0.5)] shadow-none rounded-xl border-0 font-thin text-white text-2xl"
                onClick={() => scrollCarousel("right")}
            >
                <i className="fa-solid fa-chevron-right"></i>
            </button>
        </div >

            )
}

export default MainCarousel