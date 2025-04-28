import Header from "../components/shared/Header";
import Footer from "../components/shared/Footer";
import HelmetHandler from "../components/shared/HelmetHandler";
import { seo } from "../seo/helmetStrings";
import BackgroundImage from "../components/shared/BackgroundImage";
import { images } from "../data/images";
import LoginForm from "../feature/login/LoginForm";

const LoginPage = () => {
    return (
        <div className="flex flex-col min-h-screen bg-[rgb(22,22,22)] text-white w-full">
            <HelmetHandler page={seo.login} />

            <Header className="max-w-350 mx-auto" />

            <BackgroundImage className="min-h-230 brightness-50" 
                src={images.login.background.src} 
                alt={images.login.background.alt} />
            
            <div className="relative z-10 flex-grow flex flex-col items-center justify-center w-full">
                <LoginForm />
            </div>

            <div className="relative z-10 bg-[rgb(22,22,22)] py-5">
                <Footer />
            </div>
        </div>

    );
};

export default LoginPage;
