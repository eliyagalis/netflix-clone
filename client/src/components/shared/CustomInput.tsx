import React from 'react'

type CustomInputProps = {
    placeholder: string,
    error: string
    required: boolean
}

const CustomInput:React.FC<CustomInputProps> = ({placeholder, error, required}) => {
    return (
        <div>
            <input type="email" required={required} id="floatingInput" placeholder=" "
                className="validator input peer pb-5.5 pt-8 text-lg w-full 
                            placeholder-transparent bg-[rgba(34,34,34,0.5)] text-white 
                            font-medium border-1 border-gray-500"
            />
            <label
                htmlFor="floatingInput"
                className="absolute font-normal left-3 top-1 text-xs text-gray-300 
                        transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-lg 
                        peer-placeholder-shown:text-gray-300 peer-focus:top-1 peer-focus:text-xs 
                        peer-focus:text-gray-300"
            >
                {placeholder}
            </label>
            <div className="absolute validator-hint text-left flex items-center gap-2">
                <span className="whitespace-nowrap text-sm">{error}Enter valid email address</span>
            </div>
        </div>
    )
}

export default CustomInput