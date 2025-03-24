
interface Movie {
    src: string;
}

const Carousel = ({ movies, setFloatingPoster }: { movies: Array<Movie>, setFloatingPoster: Function }) => {
    
    const handleClick = (m: Movie) => {
        setFloatingPoster(m);
    };


    return (
        <div className="relative flex items-center px-10">
            {/* Left Arrow */}
            <button className="btn absolute left-0 z-10 w-2 py-15 bg-[rgba(70,70,70,0.95)] rounded-xl border-0 font-thin text-white text-2xl"
                onClick={() => document.getElementById("movie-carousel")?.scrollBy({ left: -700, behavior: 'smooth' })}>
                {`<`}
            </button>

            {/* Carousel */}
            <div id="movie-carousel" className="carousel carousel-start w-[100%] mx-auto h-70 rounded-box overflow-x-scroll scroll-smooth space-x-5 p-4">
                {movies.map((m: Movie, index: number) => (
                    <div className="pl-3 relative carousel-item overflow-hidden transition-transform duration-300 
                    hover:scale-105 will-change-transform cursor-pointer" key={index} onClick={()=>handleClick(m)}>
                        <img src={m.src} className="rounded-box" />
                        <div className="absolute text-[8rem] top-[30%] -left-[1px] font-bold">
                            <span className="absolute text-black -left-[2px] -top-[2px] myStroke"
                            >{index + 1}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Right Arrow */}
            <button className="btn absolute right-0 z-10 w-2 py-15 bg-[rgba(70,70,70,0.95)] rounded-xl border-0 font-thin text-white text-2xl"
                onClick={() => document.getElementById("movie-carousel")?.scrollBy({ left: 700, behavior: 'smooth' })}>
                {`>`}
            </button>
        </div>)
}

export default Carousel