import { useRef } from "react";

interface Movie {
    src: string;
}

const Carousel = ({ movies, setFloatingPoster }: { movies: Array<Movie>, setFloatingPoster: Function }) => {
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
        <div className="relative flex items-center px-10">
            {/* Left Arrow */}
            <button 
                className="btn absolute left-0 z-10 w-2 py-15 bg-[rgba(70,70,70,0.95)] shadow-none rounded-xl border-0 font-thin text-white text-2xl"
                onClick={() => scrollCarousel("left")}
            >
                <i className="fa-solid fa-chevron-left"></i>
            </button>

            {/* Carousel */}
            <div 
                ref={carouselRef} 
                className="carousel carousel-start h-70 rounded-box overflow-x-scroll scroll-smooth p-4"
            >
                {movies.map((m: Movie, index: number) => (
                    <div 
                        className="relative pl-4 carousel-item overflow-hidden transition-transform duration-300 
                        hover:scale-110 will-change-transform cursor-pointer" 
                        key={index} 
                        onClick={() => setFloatingPoster(m)}
                    >
                        <img src={m.src} className="rounded-3xl object-cover w-[80%]" />
                        <div className="absolute top-0 font-bold">
                            <span className="absolute font-black text-black text-[4.5rem] -left-4 myStroke">
                                {index + 1}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Right Arrow */}
            <button 
                className="btn absolute right-0 z-10 w-2 py-15 bg-[rgba(70,70,70,0.95)] shadow-none rounded-xl border-0 font-thin text-white text-2xl"
                onClick={() => scrollCarousel("right")}
            >
                <i className="fa-solid fa-chevron-right"></i>
            </button>
        </div>
    );
};

export default Carousel;
