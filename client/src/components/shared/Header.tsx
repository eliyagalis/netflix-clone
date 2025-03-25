import React from "react";

interface HeaderProps {
    children?: React.ReactNode;
}

const Header:React.FC<HeaderProps> = ({ children }) => {
    return (
        <header className="relative bg-black z-10 flex justify-center max-w-350 mx-auto">
            <div className="absolute w-[90%] mx-10 my-5 flex items-center justify-between">
                <img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" 
                alt="logo" 
                className="w-36" />
                {children && <div>{children}</div>}
            </div>
            
        </header>
    )
}

export default Header