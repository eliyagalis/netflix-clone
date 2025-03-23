
const Header = () => {
    return (
        <header className="relative bg-black z-10 flex justify-center">
            <div className="absolute w-8/10 mx-10 my-5 flex items-center justify-between">
                <img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" 
                alt="logo" 
                className="w-36" />
                <button className="btn border-none bg-[rgb(229,9,20)] hover:bg-[rgb(200,0,10)] h-auto p-3 pt-2 pb-2 text-white shadow">
                    Sign In
                </button>
            </div>
        </header>
    )
}

export default Header