import Header from "../components/shared/Header";
import Footer from "../components/shared/Footer";
import HelmetHandler from "../components/shared/HelmetHandler";
import { seo } from "../seo/helmetStrings";
import { images } from "../data/images";
import LoginForm from "../feature/login/LoginForm";
import { colors } from "../data/colors";

const LoginPage = () => {
    return (
        <div className="flex flex-col min-h-screen bg-[rgb(22,22,22)] text-white w-full">
            <HelmetHandler page={seo.login} />


            <div className="relative flex-1 w-full flex items-center justify-center overflow-hidden">
                <img
                    src={images.login.background.src}
                    alt={images.login.background.alt}
                    className="absolute inset-0 w-full h-full object-cover brightness-50"
                />

                <div className="relative z-10 w-full max-w-270 flex flex-col items-center justify-center">
                    <Header className="absolute max-w-350 mx-auto" />
                    <LoginForm />
                </div>
            </div>

            <Footer className={`z-10 w-full ${colors.background.darkGray} font-semibold ${colors.text.lightGray}`} />
        </div>
    );
};

export default LoginPage;
