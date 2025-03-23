import ArchWithGradient from "../components/landing-page/ArchWithGradient"
import Header from "../components/shared/Header"

const LandingPage = () => {
    return (
        <>
            <div className="bg-black w-full h-500">
                <Header />
                <div className="w-full h-180 overflow-hidden">
                    <div className="z-1 text-center absolute w-full
                        my-50 flex flex-col items-center">
                        <h1 className="text-3xl sm:text-3xl md:text-4xl 
                            w-5/10 lg:text-5xl xl:text-6xl text-white font-black">
                            Unlimited movies, TV shows, and more
                        </h1>
                        <p className="text-xs sm:text-base md:text-lg w-4/10 
                            lg:text-xl xl:text-2xl mt-5 text-white font-medium">
                            Starts at ₪32.90. Cancel anytime.
                        </p>
                        <p className="text-white mt-7 mb-3">Ready to watch? Enter your email to create or restart your membership.</p>
                        <div className="flex flex-row justufy-center items-start gap-2 wrap">

                            <div className="">
                                <input className="input-ghost border border-white 
                                rounded p-4 w-80 focus:border-gray-500 focus:bg-[rgba(124, 101, 101, 0.5)]
                                text-white font-medium bg-[rgba(124, 101, 101, 0.5)]
                                validator
                                " type="email" required/>

                                <div className="validator-hint text-left text-base">
                                    Please enter a valid email address.
                                </div>
                                <div className="w-full h-30" />
                            </div>

                            {/*                             
                            <div className="relative">
                                <input id="email" name="email" type="email" required
                                    className="peer border-2 rounded p-4 w-100 text-white 
                                    placeholder-transparent focus:outline-none 
                                    border-gray-500 focus:border-rose-600 
                                    peer-empty:border-gray-500 
                                    peer-invalid:border-red-500 peer-valid:border-green-500"
                                    placeholder="john@doe.com"
                                />
                                <label
                                    htmlFor="email"
                                    className="absolute left-4 -top-1 text-white text-sm transition-all 
                                    peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-300 
                                    peer-placeholder-shown:top-4 peer-focus:-top-1 
                                    peer-focus:text-gray-300 peer-focus:text-sm">
                                    Email address
                                </label>
                                <p className="text-red-500 text-sm mt-1 peer-empty:invisible peer-invalid:visible">
                                    Invalid email format
                                </p>
                            </div>

                             <div>
                                <input className="input validator bg-transparent py-7 w-70" type="email" required placeholder="mail@site.com" />
                                <div className="validator-hint">Enter valid email address</div>
                            </div> */ }

                            <button className="btn border-none bg-[rgb(229,9,20)] hover:bg-[rgb(200,0,10)] 
                                h-auto px-6 py-3 text-white shadow text-2xl">
                                Get Started {` >`}
                            </button>


                        </div>
                        <div className="w-full h-full bg-black">
                            <ArchWithGradient />
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