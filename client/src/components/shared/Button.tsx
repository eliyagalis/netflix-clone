import React from "react"
import { useNavigate } from "react-router-dom"
import { colors } from "../../data/colors";

type RoundedButtonProps = {
    color: Color;
    className?: string;
    children?: React.ReactNode;
    navLink?: string;
    rounded?: boolean;
}

type Color = {
    color: string;
    hover: string;
    textColor: string;
}

const Button:React.FC<RoundedButtonProps> = (
    {
        color = colors.primary, 
        children, 
        className, 
        navLink = "/", 
        rounded
    }) => {
    
    const navigate = useNavigate();

    return (
    <button className={`btn border-none ${rounded && 'rounded-full'} text-{${color.textColor}} bg-[${color.color}]
        ${className} shadow hover:bg-[${color.hover}] transition-all duration-300`}
        onClick={()=> navigate(navLink)}
        >
        {children}
    </button>
  )
}

export default Button