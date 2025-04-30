import React from "react";
import { useNavigate } from "react-router-dom";
import { ColorProps, colors } from "../../data/colors";

type ButtonProps = {
  color?: ColorProps;
  className?: string;
  children?: React.ReactNode;
  navLink?: string;
  rounded?: boolean;
  fontSize?: string;
  type?: "button" | "submit" | "reset";
  border?:string,
  onClickFunc?:()=>void;

};

const Button: React.FC<ButtonProps> = ({
  color = colors.buttons.primary,
  children,
  className = "",
  type = "button",
  navLink,
  fontSize,
  rounded,
  onClickFunc,
  border="border-none",
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (navLink) {
      navigate(navLink);
      return;
    }
    if (onClickFunc) {
      onClickFunc();
    }
  };

  return (
    <button
      type={type}
      className={`btn ${border} ${className} ${rounded ? "rounded-full" : ""}
        ${color.bg} ${color.hover} ${color.text} ${className} ${fontSize} 
        shadow transition-all duration-300
      `}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

export default Button;
