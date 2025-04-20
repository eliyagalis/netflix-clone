import Header from "../components/shared/Header";
import Footer from "../components/shared/Footer";
import { Link } from "react-router-dom";
import HelmetHandler from "../components/shared/HelmetHandler";
import { seo } from "../seo/helmetStrings";
import BackgroundImage from "../components/shared/BackgroundImage";
import { images } from "../data/images";
import LoginForm from "../feature/LoginForm";

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
                <LoginForm />
            </div>

            <div className="relative z-10 bg-[rgb(22,22,22)] p-5 pt-15 w-full mx-auto">
                <Footer className="w-9/10 max-w-350 mx-auto" />
            </div>
        </div>

    );
};

export default LoginPage;
