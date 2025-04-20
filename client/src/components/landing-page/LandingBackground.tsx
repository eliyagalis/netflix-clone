import { images } from "../../data/images"
import BackgroundImage from "../shared/BackgroundImage"


const LandingBackground = () => {
    return (
        <>
            <BackgroundImage
                className="brightness-70 max-h-130"
                src={images.landing.background.src}
                alt={images.landing.background.alt}>


                <div className="absolute inset-0 w-full backdrop-blur-3xl pointer-events-none">
                    <div className="relative w-full h-full">
                        <div className="absolute top-0 w-full h-150 bg-gradient-to-t from-transparent to-[rgb(73,47,54,0.5)]" />
                        <div className="absolute bottom-0 w-full h-80 bg-gradient-to-t from-[rgb(15,15,10)] to-transparent" />
                        <div className="absolute top-0 w-full h-30 bg-gradient-to-t from-transparent to-black" />
                    </div>
                </div>
            </BackgroundImage>
        </>
    )
}

export default LandingBackground