import { images } from "../../data/images"


const LandingBackground = () => {
    return (
        <>
            <div className="absolute inset-0 w-full backdrop-blur-3xl pointer-events-none">
                <img className="brightness-70 w-full h-full max-h-130 object-cover"
                    src={images.home.background.src} alt={images.home.background.alt} />
            </div>

            <div className="absolute inset-0 w-full backdrop-blur-3xl pointer-events-none">
                <div className="relative w-full h-full">
                    <div className="absolute top-0 w-full h-150 bg-gradient-to-t from-transparent to-[rgb(73,47,54,0.5)]" />
                    <div className="absolute bottom-0 w-full h-80 bg-gradient-to-t from-[rgb(15,15,10)] to-transparent" />
                    <div className="absolute top-0 w-full h-30 bg-gradient-to-t from-transparent to-black" />
                </div>
            </div>
        </>
    )
}

export default LandingBackground