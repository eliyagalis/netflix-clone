import React from "react";
import { useNavigate } from "react-router-dom";
import { ColorProps, colors } from "../../data/colors";

type ButtonProps = {
  color: ColorProps;
  className?: string;
  children?: React.ReactNode;
  navLink?: string;
  rounded?: boolean;
  fontSize?: string;
  type?: "button" | "submit" | "reset";
};

const Button: React.FC<ButtonProps> = ({
  color = colors.primary,
  children,
  className = "",
  type = "button",
  navLink,
  fontSize,
  rounded
}) => {
  const navigate = useNavigate();
  const isPrimary = color === colors.primary;
  const textColorClass = isPrimary ? "text-white" : "";

  const handleClick = () => {
    if (navLink) {
      navigate(navLink);
    }
  };

  return (
    <button
      type={type} className={`btn border-none ${rounded ? "rounded-full" : ""}
        ${textColorClass} bg-[${color.color}] hover:bg-[${color.hover}] ${className + " " + fontSize}
        shadow transition-all duration-300
      `}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

export default Button;
