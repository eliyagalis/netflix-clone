import React from "react"
import { Link } from "react-router-dom"

type RoundedButtonProps = {
    color?: string;
    hover?: string;
    link?: string;
    size?: string;
    additional?: string;
    children?: React.ReactNode;
}

const RoundedButton:React.FC<RoundedButtonProps> = ({color = "rgb(229,9,20)", hover = "rgb(200,0,10)", link = "/", children, additional}) => {
  
    return (
    <Link to={link} type="submit" className={`btn border-none rounded-full bg-[${color}] ${additional} shadow hover:bg-[${hover}]`}>
        {children}
    </Link>
  )
}

export default RoundedButton