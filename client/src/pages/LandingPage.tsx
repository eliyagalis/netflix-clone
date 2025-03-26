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


            <div className="w-full overflow-hidden">
                {/* Background */}
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
                <div className="relative mx-auto w-[95%] max-w-460 h-140 flex flex-col">
                    <img
                        className="brightness-30 z-10 w-full h-full object-cover rounded-3xl mx-auto border-x-2 border-[rgba(202,202,202,0.5)]"
                        src={images.home.poster.src} alt={images.home.poster.alt} />
                    <div className="absolute z-20 bottom-0 w-full h-70 bg-gradient-to-t from-[rgba(146,146,146,0.2)] to-transparent"></div>
                    <div className="absolute z-20 bottom-0 w-full h-90 bg-gradient-to-t from-[rgba(29,29,29,1)] to-transparent"></div>

                    <div className="absolute w-full h-full z-50 flex flex-col items-center text-center justify-end">
                        <div className="relative w-9/10 flex flex-col items-center">
                            <h1 className="text-2xl w-3/5 md:text-4xl lg:text-5xl xl:text-6xl
                            text-white font-black max-w-[90%]">
                                {strings.landing.headline1}
                            </h1>
                            <p className="text-base md:text-lg 
                            lg:text-xl xl:text-2xl mt-5 text-white font-medium">
                                {strings.landing.headline2}
                            </p>
                            <p className="text-white mt-7 mb-3">{strings.landing.inputText}</p>
                            
                            <LandingForm />

                        </div>
                        <div className="relative z-100 w-full bg-white">
                            <ArchWithGradient />
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative text-white z-50 w-8/10 max-w-350 mx-auto">
                <h1 className="text-2xl font-bold">Trending Now</h1>

                <Carousel movies={movies} setFloatingPoster={(res: Movie) => setMovieDetails(res)} />

                <br />
                {/* More Reasons to Join */}
                <h1 className="text-2xl font-bold">More Reasons to Join</h1>
                <div className="mb-12 py-5 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                    <div className="card rounded-xl shadow bg-gradient-to-br from-[rgba(9,0,90,0.5)] via-[#1d182e] to-[rgba(32,14,24,1)] p-1">
                        <div className="card-body box-sizing">
                            <h1 className="card-title text-2xl font-bold">Enjoy on your TV</h1>
                            <p>Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray players, and more.</p>
                        </div>
                    </div>

                    <div className="card rounded-xl shadow bg-gradient-to-br from-[rgba(9,0,90,0.5)] via-[#1d182e] to-[rgba(32,14,24,1)] p-1">
                        <div className="card-body box-sizing">
                            <h1 className="card-title text-2xl font-bold">Download your shows to watch offline</h1>
                            <p>Save your favorites easily and always have something to watch.</p>
                        </div>
                    </div>

                    <div className="card rounded-xl shadow bg-gradient-to-br from-[rgba(9,0,90,0.5)] via-[#1d182e] to-[rgba(32,14,24,1)] p-1">
                        <div className="card-body box-sizing">
                            <h1 className="card-title text-2xl font-bold">Watch everywhere</h1>
                            <p>Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV.</p>
                        </div>
                    </div>

                    <div className="card rounded-xl shadow bg-gradient-to-br from-[rgba(9,0,90,0.5)] via-[#1d182e] to-[rgba(32,14,24,1)] p-1">
                        <div className="card-body box-sizing">
                            <h1 className="card-title text-2xl font-bold">Create profiles for kids</h1>
                            <p className="text-base">Send kids on adventures with their favorite characters in a space made just for them — free with your membership.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative w-full">
                <div className="relative text-white z-50 w-8/10 max-w-350 mx-auto mb-12">
                    <h1 className="text-2xl font-medium">Frequently Asked Questions</h1>
                    <CollapseQuestion />
                    <br />
                    <p className="text-center text-white mt-7 mb-3">Ready to watch? Enter your email to create or restart your membership.</p>

                    <LandingForm />
                </div>
                <Footer />
            </div>
        </div>
    )
}

export default LandingPage