const LandingForm = () => {
    return (
        <div className="w-full flex flex-row flex-wrap justify-center items-start gap-x-2 mt-1 mb-10">
            {/* form section */}
            <div className="relative w-100 pb-10">
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
                    <span className="whitespace-nowrap text-sm">Enter valid email address</span>
                </div>
            </div>
            <button className="btn border-none bg-[rgb(229,9,20)] hover:bg-[rgb(200,0,10)] 
            h-auto px-6 py-3 text-white shadow text-2xl">
                Get Started {` >`}
            </button>
        </div>
    )
}

export default LandingForm