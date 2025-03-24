const ArchWithGradientTailwind = () => {
    return (
        <div className="w-full relative mt-10">
            {/* Red Arch */}
            <div className="absolute rounded-[50%] z-10 w-full h-22 bg-[rgb(229,9,20)] shadow 
                left-1/2 transform -translate-x-1/2" 
                style={{ maskImage: "linear-gradient(to top, transparent 50%, black 100%)" }}></div>

            {/* Black Background */}
            <div className="absolute top-1 rounded-t-[50%] z-10 w-full h-22 bg-black 
                left-1/2 transform -translate-x-1/2"></div>
            <div className="absolute top-10 w-full h-30 bg-black"></div>

            {/* Border */}
            <div className="absolute top-1 rounded-[50%] z-10 w-full h-20 bg-gradient-to-b from-blue-500 to-transparent 
                            left-1/2 transform -translate-x-1/2 overflow-hidden opacity-30" 
                 style={{ maskImage: "linear-gradient(to top, transparent 50%, black 100%)" }}></div>

        </div>
    );
};

export default ArchWithGradientTailwind;
