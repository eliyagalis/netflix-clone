import Header from "../components/shared/Header"

const LandingPage = () => {
    return (
        <>
            <div>
                <Header />
                <div className="w-full h-150 overflow-hidden">
                    <div className="z-1 text-center absolute w-full my-70 flex flex-col justify-center items-center">
                        <h1 className="text-2xl sm:text-3xl md:text-3xl w-4/10 lg:text-4xl xl:text-5xl text-white font-bold">Unlimited movies, TV shows, and more</h1>
                        <p className="text-sm sm:text-base md:text-lg w-4/10 lg:text-xl xl:text-xl mt-5 text-white font-medium">Starts at ₪32.90. Cancel anytime.</p>
                        <p className="text-white mt-7">Ready to watch? Enter your email to create or restart your membership.</p>
                        <div>
                            <input className="input validator bg-0" type="email" required placeholder="mail@site.com" />
                            <div className="validator-hint">Enter valid email address</div>
                        </div>
                    </div>
                    <img
                        className="brightness-30 z-0 w-full h-full object-cover"
                        src="https://assets.nflxext.com/ffe/siteui/vlv3/f6e7f6df-6973-46ef-b98f-12560d2b3c69/web/IL-en-20250317-TRIFECTA-perspective_253c970d-8a6c-4257-b0b0-66a78d743927_large.jpg"
                    />

                </div>
            </div>
        </>
    )
}

export default LandingPage