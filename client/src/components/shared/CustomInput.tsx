import React, { useState } from 'react'

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    placeholder: string;
    error?: string; 
    rounded?: boolean;
    data?: string;
    onBlur?: () => void;
    success?: string;
}

const CustomInput: React.FC<CustomInputProps> = ({ placeholder, error, rounded, data, onBlur, onChange, success, ...props }) => {
    return (
        <div>
            <input id="floatingInput" placeholder=" "
                className={`input peer px-5 pt-10 pb-6 text-lg w-full ${rounded && `rounded-full`} placeholder-transparent bg-[rgba(80,80,80,0.7)] text-white font-medium border-1 
                ${error? "border-red-500": "border-gray-500"} ${success}`}
                onChange={onChange}
                value={data}
                onBlur={onBlur}

                {...props}
            />
            
            <label
                htmlFor="floatingInput"
                className="absolute font-normal left-5 top-2 text-xs text-gray-300
                        transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-lg 
                        peer-placeholder-shown:text-gray-300 peer-focus:top-2 peer-focus:text-xs 
                        peer-focus:text-gray-300"
            >
                {placeholder}
            </label>
            
                <div className="text-left flex items-center pl-4 h-10">
                {error &&<span className="whitespace-nowrap text-sm text-red-500"><i className='fa-regular fa-circle-xmark'></i> {error}</span>
}</div>
        </div>
    )
}

export default CustomInput
