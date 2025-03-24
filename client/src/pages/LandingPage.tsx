import ArchWithGradient from "../components/landing-page/ArchWithGradient"
import CollapseQuestion from "../components/landing-page/CollapseQuestion";
import LandingForm from "../components/landing-page/LandingForm";
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

                    <LandingForm />
                    <ArchWithGradient />
                </div>

                {/* Background */}
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

            <div className="relative text-white z-50 w-8/10 max-w-350 mx-auto mb-12">
                <h1 className="text-2xl font-medium">Trending Now</h1>
                <Carousel movies={movies} />
                <br />
                {/* More Reasons to Join */}
                <h1 className="text-2xl font-medium">More Reasons to Join</h1>
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
                <br />
                <h1 className="text-2xl font-medium">Frequently Asked Questions</h1>
                <CollapseQuestion />
                <br/>
                <p className="text-center text-white mt-7 mb-3">Ready to watch? Enter your email to create or restart your membership.</p>
                <LandingForm />
            </div>
            <Footer />
        </div>
    )
}

export default LandingPage