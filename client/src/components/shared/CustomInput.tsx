import React, { useState } from 'react'

type CustomInputProps = {
    placeholder: string;
    error: string;
    required?: boolean;
    rounded?: boolean;
    setEmail: Function;
    email: string;
}

const CustomInput:React.FC<CustomInputProps> = ({placeholder, error, required, rounded, email, setEmail}) => {


    return (
        <div>
            <input type="email" id="floatingInput" placeholder=" "
                className={`validator input peer px-5 pt-10 pb-6 text-lg w-full ${rounded && `rounded-full`} placeholder-transparent bg-[rgba(34,34,34,0.5)] text-white font-medium border-1 border-gray-500`}
                onChange={(e)=> setEmail(e.target.value)}
                value={email}
            />
            {}
            <label
                htmlFor="floatingInput"
                className="absolute font-normal left-5 top-2 text-xs text-gray-300
                        transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-lg 
                        peer-placeholder-shown:text-gray-300 peer-focus:top-2 peer-focus:text-xs 
                        peer-focus:text-gray-300"
            >
                {placeholder}
            </label>
            <div className="validator-hint text-left flex items-center pl-4">
                <span className="whitespace-nowrap text-sm"><i className='fa-regular fa-circle-xmark'></i> {error}</span>
            </div>
        </div>
    )
}

export default CustomInput