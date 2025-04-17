import Header from "../components/shared/Header";
import Footer from "../components/shared/Footer";
import CustomInput from "../components/shared/CustomInput";
import { Link } from "react-router-dom";
import HelmetHandler from "../components/shared/HelmetHandler";
import { seo } from "../seo/helmetStrings";
import Button from "../components/shared/Button";
import { colors } from "../data/colors";
import { typography } from "../data/typography";
import BackgroundImage from "../components/shared/BackgroundImage";
import { images } from "../data/images";

const LoginPage = () => {
    return (
        <div className="flex flex-col min-h-screen bg-[rgb(22,22,22)] text-white w-full">
            <HelmetHandler page={seo.login} />

            <Header className="max-w-350 mx-auto">
                <Link to={"/"}></Link>
            </Header>

            <BackgroundImage className="min-h-230 brightness-50" 
                src={images.login.background.src} 
                alt={images.login.background.alt} />
            
            <div className="relative z-10 flex-grow flex flex-col items-center justify-center w-full">
                <form className="form p-15 mb-5 bg-[rgba(0,0,0,0.7)] z-10 rounded-lg">
                    <div className="text-3xl text-white font-bold mb-4">Sign In</div>

                    <div className="relative my-4">
                        <CustomInput
                            required
                            placeholder="Email address"
                            error="Enter valid email address"
                        />
                    </div>

                    <div className="relative my-4">
                        <CustomInput
                            required
                            placeholder="Password"
                            error="Password is required"
                        />
                    </div>

                    <Button color={colors.primary} type="submit" className="w-full" fontSize={typography.xxsmall}>
                        Sign In
                    </Button>

                    <Link className="w-full my-5 text-center underline text-white block hover:text-gray-300" to={"/"}>
                        Forgot Password?
                    </Link>
                    <span className="text-gray-300">
                        New to Netflix? <Link className="font-bold hover:underline" to={"/"}>Sign up now.</Link>
                    </span>
                </form>
            </div>

            <div className="relative z-10 bg-[rgb(22,22,22)] p-5 pt-15 w-full mx-auto">
                <Footer className="w-9/10 max-w-350 mx-auto" />
            </div>
        </div>

    );
};

export default LoginPage;
