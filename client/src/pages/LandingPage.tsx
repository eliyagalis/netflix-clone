import ArchWithGradient from "../components/landing-page/ArchWithGradient"
import Carousel from "../components/shared/Carousel";
import Footer from "../components/shared/Footer"
import Header from "../components/shared/Header"

const LandingPage = () => {

    interface Movie {
        src: string;
    }

    const movies: Array<Movie> = [
        { src: "https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp" },
        { src: "https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.webp" },
        { src: "https://img.daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.webp" },
        { src: "https://img.daisyui.com/images/stock/photo-1494253109108-2e30c049369b.webp" },
        { src: "https://img.daisyui.com/images/stock/photo-1550258987-190a2d41a8ba.webp" },
        { src: "https://img.daisyui.com/images/stock/photo-1559181567-c3190ca9959b.webp" },
        { src: "https://img.daisyui.com/images/stock/photo-1601004890684-d8cbf643f5f2.webp" },
        { src: 'https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp' },
        { src: "https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.webp" },
        { src: "https://img.daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.webp" },
    ];

    return (
        <div className="bg-black w-full min-h-screen">
            <Header />
            <div className="w-full h-170 overflow-hidden">
                <div className="z-1 text-center absolute w-full 
                        mt-45 flex flex-col items-center">
                    <h1 className="text-3xl sm:text-3xl md:text-4xl 
                            w-5/10 lg:text-5xl xl:text-6xl text-white font-black max-w-200">
                        Unlimited movies, TV shows, and more
                    </h1>
                    <p className="text-xs sm:text-base md:text-lg w-4/10 
                            lg:text-xl xl:text-2xl mt-5 text-white font-medium">
                        Starts at ₪32.90. Cancel anytime.
                    </p>
                    <p className="text-white mt-7 mb-3">Ready to watch? Enter your email to create or restart your membership.</p>

                    {/* form section */}
                    <div className="w-full flex flex-row flex-wrap justify-center items-start gap-x-2 mt-1 mb-10">
                        <div className="relative w-80">
                            <input type="email" required id="floatingInput" placeholder=" "
                                className="validator input peer pb-5.5 pt-8 text-lg w-full 
                                                placeholder-transparent bg-[rgba(34,34,34,0.5)] text-white 
                                                font-medium border-1 border-gray-500"
                            />
                            <label
                                htmlFor="floatingInput"
                                className="absolute font-normal left-3 top-1 text-xs text-gray-300 
                                            transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-lg 
                                            peer-placeholder-shown:text-gray-300 peer-focus:top-1 peer-focus:text-xs 
                                            peer-focus:text-gray-300"
                            >
                                Email address
                            </label>
                            <div className="absolute validator-hint text-left flex items-center gap-2">
                                <span className="whitespace-nowrap">Enter valid email address</span>
                            </div>
                        </div>

                        <button className="btn border-none bg-[rgb(229,9,20)] hover:bg-[rgb(200,0,10)] 
                                h-auto px-6 py-3 text-white shadow text-2xl">
                            Get Started {` >`}
                        </button>

                    </div>
                    <ArchWithGradient />

                </div>
                <div className="relative mx-auto max-w-470">
                    <img
                        className="brightness-30 z-5 w-full max-w-450 h-170 object-cover mx-auto border-l-2 border-r-2 border-[rgb(255,104,34)]"
                        src="https://assets.nflxext.com/ffe/siteui/vlv3/f6e7f6df-6973-46ef-b98f-12560d2b3c69/web/IL-en-20250317-TRIFECTA-perspective_253c970d-8a6c-4257-b0b0-66a78d743927_large.jpg"
                    />
                    <div className="absolute inset-0 w-full h-full pointer-events-none">
                        {/* Left Shadow */}
                        <div className="absolute z-0 top-0 left-460 w-1/8 opacity-40 h-full bg-gradient-to-l from-transparent to-[rgba(229,9,20,0.7)]"></div>

                        {/* Right Shadow */}
                        <div className="absolute z-0 top-0 right-460 w-1/8 opacity-40 h-full bg-gradient-to-l from-[rgba(229,9,20,0.7)] to-transparent"></div>
                    </div>
                </div>
            </div>

            <div className="relative text-white z-50 w-8/10 max-w-350 mx-auto">
                <h1 className="text-2xl font-medium">Trending Now</h1>
                <Carousel movies={movies} />
            </div>

            <div className="relative text-white z-50 w-8/10 max-w-350 mx-auto">
                {/* More Reasons to Join */}
                <h1 className="text-2xl font-medium">More Reasons to Join</h1>
                <div className="h-60 p-4 mb-10 w-full border-1 border-dotted border-white">


                </div>

            </div>
            <Footer />
        </div>
    )
}

export default LandingPage