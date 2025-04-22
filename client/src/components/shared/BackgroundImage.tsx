import React from "react";

type BackgroundProps = {
    className: string;
    src: string;
    alt: string;
    children?: React.ReactNode;
}

const BackgroundImage:React.FC<BackgroundProps> = ({className, src, alt, children}) => {
    return (
        <div>
            <img
                className={`absolute top-0 left-0 h-full w-full object-cover z-0 inset-0 ${className}`}
                src={src}
                alt={alt}
            >
            </img>
            {children}
        </div>
    )
}

export default BackgroundImage