import { Helmet } from "react-helmet";
import Header from "../components/shared/Header";
import Footer from "../components/shared/Footer";
import CustomInput from "../components/shared/CustomInput";
import { Link } from "react-router-dom";
import { useState } from "react";

const LoginPage = () => {
    const [loginData, setLoginData] = useState({ email: '', password: '' });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    return (
        <div className="h-screen flex flex-col">
            <Helmet>
                <title>Netflix - Sign In to Your Account</title>
                <meta name="description" content="Sign in to Netflix to continue watching your favorite TV shows and movies. Enjoy unlimited entertainment on any device." />
                <meta name="robots" content="noindex, nofollow" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Helmet>

            <div className="absolute">
                <Header>
                    <Link to={"/"}></Link>
                </Header>
            </div>

            <div className="relative flex-grow flex items-center justify-center">
                {/* Background Image */}
                <img
                    className="absolute top-0 left-0 w-full h-full object-cover z-0 brightness-50"
                    src="https://assets.nflxext.com/ffe/siteui/vlv3/f6e7f6df-6973-46ef-b98f-12560d2b3c69/web/IL-en-20250317-TRIFECTA-perspective_253c970d-8a6c-4257-b0b0-66a78d743927_large.jpg"
                    alt="Netflix Background"
                />

                {/* Login Form */}
                <form className="form w-full max-w-md p-12 m-16 bg-[rgba(0,0,0,0.7)] z-5 rounded-lg">
                    <div className="text-3xl text-white font-bold mb-4">Sign In</div>
                    <div className="relative my-4">
                        <CustomInput 
                            // name="email"
                            required 
                            placeholder="Email address" 
                            error="Enter valid email address"
                        />
                    </div>
                    <div className="relative my-4">
                        <CustomInput 
                            // name="password"
                            required 
                            placeholder="Password" 
                            error="Password is required" 
                        />
                    </div>
                    <button className="btn border-none bg-[rgb(229,9,20)]
                        hover:bg-[rgb(200,0,10)] w-full text-lg
                        h-auto py-2 text-white shadow">
                        Sign In
                    </button>
                    <Link className="w-full my-5 text-center underline text-white block hover:text-gray-300" to={"/"}>Forgot Password?</Link>
                    <span className="text-gray-300">New to Netflix? <Link className="font-bold hover:underline" to={"/"}>Sign up now.</Link></span>
                </form>
            </div>

            {/* Footer Section */}
            <div className="bg-[rgb(22,22,22)] p-5 pt-15">
                <Footer />
            </div>
        </div>
    );
};

export default LoginPage;
