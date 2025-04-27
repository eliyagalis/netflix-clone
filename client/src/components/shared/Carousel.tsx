import React, { useRef } from "react";
import { CarouselArrow } from "./carousel/CarouselArrow";
import { IMovieCard } from "../../types/IMovieCard";
import LandingCarouselCard from "../landing-page/LandingCarouselCard";
import { ICarouselCard } from "../../types/ICarouselCard";

type CarouselProps = {
    movies: Array<IMovieCard>;
    isIndexed?: boolean;
    setFloatingPoster: Function;
}

const Carousel:React.FC<CarouselProps> = ({ movies, setFloatingPoster, isIndexed }) => {
    
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
            <CarouselArrow direction="left" onClick={() => scrollCarousel('left')} />

            <div 
                ref={carouselRef} 
                className="carousel carousel-start rounded-box overflow-x-scroll scroll-smooth p-4 h-50 sm:h-50 md:h-60 lg:h-70"
            >
                {movies.map((m: ICarouselCard, index: number) => (
                    <LandingCarouselCard key={m.id} m={m} 
                        index={index} setFloatingPoster={setFloatingPoster} />
                ))}
            </div>

            <CarouselArrow direction="right" onClick={() => scrollCarousel('right')} />
        </div>
    );
};

export default Carousel;
