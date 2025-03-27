import { useEffect, useState } from "react";
import ArchWithGradient from "../components/landing-page/ArchWithGradient";
import CollapseQuestion from "../components/landing-page/CollapseQuestion";
import Carousel from "../components/shared/Carousel";
import Footer from "../components/shared/Footer";
import Header from "../components/shared/Header";
import CustomInput from "../components/shared/CustomInput";
import RoundedButton from "../components/shared/RoundedButton";
import { seo } from "../seo/helmetStrings";
import HelmetHandler from "../components/shared/HelmetHandler";
import { Movie } from "../models/Movie";
import FloatingWindow from "../components/shared/FloatingWindow";
import { movies } from "../data/mock";
import { images } from "../data/images";
import { strings } from "../data/strings";
import LandingForm from "../components/shared/LandingForm";
import Card from "../components/landing-page/Card";

const LandingPage = () => {
    const [movieDetails, setMovieDetails] = useState<Movie | null>(null);

    return (
        <div className={`absolute left-0 bg-[rgb(15,15,15)] w-full min-h-screen`}>
            <HelmetHandler page={seo.landing} />
            <div className="relative max-w-460 mx-auto">
                <Header>
                    <RoundedButton link={"/login"} color="(rgb(255,255,255))" hover="(rgb(206,206,206))">Sign In</RoundedButton>
                </Header>
            </div>

            {movieDetails && <FloatingWindow movieDetails={movieDetails} setMovieDetails={setMovieDetails} />}

            {/* Background */}
            <div className="w-full overflow-hidden">
                <div className="absolute inset-0 w-full backdrop-blur-2xl pointer-events-none">
                    <img className="brightness-70 w-full h-full max-h-130 object-cover"
                        src={images.home.background.src} alt={images.home.background.alt} />
                </div>
                <div className="absolute inset-0 w-full backdrop-blur-3xl pointer-events-none">
                    <div className="relative w-full h-full">
                        <div className="absolute top-0 w-full h-150 bg-gradient-to-t from-transparent to-[rgb(73,47,54,0.5)]"></div>
                        <div className="absolute bottom-0 w-full h-80 bg-gradient-to-t from-[rgb(15,15,10)] to-transparent"></div>
                    </div>
                </div>

                {/* Movies Poster */}
                <div className="relative mx-auto w-[95%] max-w-460 h-140 flex flex-col text-white">
                    <img
                        className="brightness-30 z-10 w-full h-full object-cover rounded-3xl mx-auto border-x-2 border-[rgba(202,202,202,0.5)]"
                        src={images.home.poster.src} alt={images.home.poster.alt} />
                    <div className="absolute z-20 bottom-0 w-full h-70 bg-gradient-to-t from-[rgba(146,146,146,0.2)] to-transparent"></div>
                    <div className="absolute z-20 bottom-0 w-full h-90 bg-gradient-to-t from-[rgba(29,29,29,1)] to-transparent"></div>

                    <div className="absolute w-full h-full z-50 flex flex-col items-center text-center justify-end">
                        <div className="relative w-9/10 flex flex-col items-center">
                            <h1 className="text-2xl w-3/5 md:text-4xl lg:text-5xl xl:text-6xl font-black max-w-[90%]">
                                {strings.landing.poster.headline1}
                            </h1>
                            <p className="text-base md:text-lg lg:text-xl xl:text-2xl mt-5 font-medium">
                                {strings.landing.poster.headline2}
                            </p>
                            <p className="mt-7 mb-3">{strings.landing.poster.inputText}</p>
                            <LandingForm />
                        </div>
                        <div className="relative z-100 w-full bg-white">
                            <ArchWithGradient />
                        </div>
                    </div>
                </div>
            </div>

            {/* Landing Page Body */}
            <div className="relative text-white z-50 w-8/10 max-w-350 mx-auto">
                <h1 className="text-2xl font-bold">{strings.landing.trending.headline}</h1>
                <Carousel movies={movies} setFloatingPoster={(res: Movie) => setMovieDetails(res)} />
                <br />

                <h1 className="text-2xl font-bold">{strings.landing.plans.headline}</h1>
                <div className="py-5 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                    {strings.landing.plans.cards.map((card, index) => (
                        <Card plans count={index} key={index} title={card.title} subtitle={card.subtitle} bulletPoints={card.bulletPoints} price={card.price}/>
                    ))}
                </div>
                <br />

                <h1 className="text-2xl font-bold">{strings.landing.reasons.headline}</h1>
                <div className="py-5 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                    {strings.landing.reasons.cards.map((card, index) => (
                        <Card count={index} key={index} title={card.title} subtitle={card.subtitle} />
                    ))}
                </div>
                <br />

                <h1 className="text-2xl font-medium">Frequently Asked Questions</h1>
                    <div>
                        {strings.landing.collapse.map((c,index)=> (
                            <CollapseQuestion key={index} title={c.title} subtitle1={c.subtitle1} subtitle2={c?.subtitle2} />
                        ))}
                    </div>
                <br />
                <p className="text-center text-white mt-7 mb-3">Ready to watch? Enter your email to create or restart your membership.</p>
                <LandingForm />
                <br />
                <Footer />
            </div>
        </div>
    )
}

export default LandingPage