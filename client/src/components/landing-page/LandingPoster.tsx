import { images } from "../../data/images"
import { typography } from "../../data/typography"
import { strings } from "../../data/strings"
import LandingForm from "../../feature/LandingForm"
import Typography from "../shared/Typography"
import PosterArch from "./PosterArch"


const LandingPoster = () => {
    return (
        <>
            <div className="relative mx-auto w-[95%] max-w-460 h-140 flex flex-col rounded-t-3xl text-white overflow-hidden">
                <img className="brightness-30 z-10 w-full h-full object-cover rounded-3xl mx-auto border-x-2 border-[rgba(202,202,202,0.5)]"
                    src={images.landing.poster.src} alt={images.landing.poster.alt} 
                />
                {/* <div
                    className="absolute brightness-50 top-0 left-0 w-[200%] h-140 object-cover rounded-3xl bg-repeat-x bg-contain scrolling-bg"
                    style={{ backgroundImage: `url(${images.landing.poster.src})` }}
                /> */}

                <div className="absolute z-20 bottom-0 w-full h-90 bg-gradient-to-t from-[rgba(29,29,29,1)] to-transparent" />
                <div className="absolute z-20 bottom-0 w-full h-50 bg-gradient-to-t from-[rgba(146,146,146,0.2)] to-transparent opacity-50" />

                <div className="absolute w-full h-full z-50 flex flex-col items-center text-center justify-end">
                    <div className="w-9/10 flex flex-col items-center">
                        <Typography className="max-w-150 font-bold md:font-black w-[90%]" size={typography.xlarge}>
                            {strings.landing.poster.headline1}
                        </Typography>
                        <Typography className="font-base my-2" size={typography.medium}>
                            {strings.landing.poster.headline2}
                        </Typography>
                        <Typography className=" my-3" size={typography.small}>
                            {strings.landing.poster.inputText}
                        </Typography>
                        <LandingForm />
                    </div>
                    <PosterArch />
                </div>
            </div>

        </>
    )
}

export default LandingPoster