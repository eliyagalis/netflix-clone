import React from "react"
import { useNavigate } from "react-router-dom"

type RoundedButtonProps = {
    color?: string;
    hover?: string;
    size?: string;
    className?: string;
    children?: React.ReactNode;
    navLink?: string;
    rounded?: boolean;
}

const RoundedButton:React.FC<RoundedButtonProps> = ({color = "rgb(229,9,20)", hover = "rgb(200,0,10)", children, className, navLink = "/", rounded}) => {
    
    const navigate = useNavigate();

    return (
    <button className={`btn border-none ${rounded && 'rounded-full'} bg-[${color}] 
        ${className} shadow hover:bg-[${hover}] transition-all duration-300`}
        onClick={()=> navigate(navLink)}
        >
        {children}
    </button>
  )
}

export default RoundedButton