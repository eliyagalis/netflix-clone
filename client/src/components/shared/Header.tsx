import React from "react";
import { images } from "../../data/images";

interface HeaderProps {
    children?: React.ReactNode;
    className?: string;
    border?: boolean;
}

const Header: React.FC<HeaderProps> = ({ children, className, border = false }) => {
    return (
        <header className={`${className} relative z-10 flex justify-center mx-auto w-full left-0 top-0 ${border ? "border-b-[0.5px] border-[rgb(230,230,230)]" : ""} overflow-hidden`}>
            <div className="w-full px-5 sm:px-8 md:px-10 my-5 flex items-center justify-between">
                <div className="flex items-center">
                    <img src={images.logo.src}
                        alt={images.logo.alt}
                        className="hidden lg:block w-36 max-w-full" />

                    <img src={images.smallLogo.src}
                        alt={images.smallLogo.alt}
                        className="block lg:hidden w-7 sm:w-6 max-w-full" />
                </div>

                {children && <>{children}</>}
            </div>
        </header>
    );
};

export default Header;
