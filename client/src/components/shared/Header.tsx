import React from "react";
import { images } from "../../data/images";
import { useNavigate } from "react-router-dom";

type HeaderProps = {
    children?: React.ReactNode;
    className?: string;
    border?: boolean;
    link?: string;
    isSwitch?: boolean;
}

const Header: React.FC<HeaderProps> = ({ children, className, link, border = false, isSwitch }) => {
    const navigate = useNavigate();

    const clickHandler = () => {
        if (link) {
            navigate(link);
        }
    };

    return (
        <header className={`${className} relative z-10 flex justify-center mx-auto w-full left-0 top-0 
                    ${border ? "border-b-[0.5px] border-[rgb(230,230,230)]" : ""} overflow-hidden`}>
            <div className="w-full px-5 md:px-10 my-2 md:my-5 flex">
                <div className={`flex items-center justify-between w-full ${link && "cursor-pointer"}`} onClick={clickHandler}>

                    {<img
                        src={images.logo.src}
                        alt={images.logo.alt}
                        className={`${isSwitch ? "hidden lg:block" : "block"} 
                        w-20 md:w-36 max-w-full`}
                    />}

                    {isSwitch && (
                        <img
                            src={images.smallLogo.src}
                            alt={images.smallLogo.alt}
                            className="block lg:hidden w-7 sm:w-6 max-w-full"
                        />
                    )}
                    {children}
                </div>
            </div>
        </header>
    );
};

export default Header;
