const PosterArch = () => {
    return (
        <div className="z-150 w-[110%] left-1/2 transform -translate-x-1/2 max-w-470 absolute bottom-4 md:bottom-4 lg:bottom-6 xl:bottom-10">
            {/* Red Arch */}
            <div 
                className="absolute rounded-[50%] z-10 w-[97%] bg-[rgb(73,47,54)] shadow 
                left-1/2 transform -translate-x-1/2 
                h-10 md:h-12 lg:h-15 xl:h-23" 
                style={{ maskImage: "linear-gradient(to top, transparent 50%, rgb(15,15,15) 100%)" }}
            ></div>

            {/* Black Background */}
            <div 
                className="absolute top-0.5 rounded-t-[50%] z-10 w-full 
                bg-[rgb(15,15,15)] left-1/2 transform -translate-x-1/2 
                h-10 md:h-12 lg:h-15 xl:h-23" 
            ></div>

            {/* Border */}
            <div 
                className="absolute top-0.5 rounded-[50%] z-10 w-full 
                bg-gradient-to-b from-[rgb(73,47,54)] to-transparent 
                left-1/2 transform -translate-x-1/2 overflow-hidden opacity-30 
                h-10 md:h-12 lg:h-15 xl:h-23" 
                style={{ maskImage: "linear-gradient(to top, transparent 50%, rgb(15,15,15) 100%)" }}
            ></div>
        </div>
    );
};

export default PosterArch;
