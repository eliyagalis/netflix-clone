const ArchWithGradientTailwind = () => {
    return (
        <div className="w-full h-[50px] mb-50 bg-black">
            {/* Red Arch */}
            {/* <div className="absolute overflow-x-hidden z-15 w-[200%] h-[55px] -left-1/2 bottom-0 bg-[rgb(229,9,20)] rounded-full"></div> */}

            <div className="absolute z-20 w-full h-[85px] bottom-[-30px] bg-[rgb(229,9,20)] rounded-t-full"></div>

            <div className="absolute z-20 w-full h-[80px] bottom-[-30px] bg-black rounded-t-full"></div>

            {/* Light Blue Gradient */}
            {/* <div className="absolute w-30 h-[80px] bottom-[-30px] bg-gradient-to-b from-[rgba(0,174,255,0.5)] to-black"></div> */}
        </div>
    );
};

export default ArchWithGradientTailwind;
