import React, { useState } from 'react';

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  error?: string;
  rounded?: boolean;
  success?: boolean;
  background?: string;
  placeholderColor?: string;
}

const CustomInput: React.FC<CustomInputProps> = ({
  placeholder,
  error,
  rounded,
  success,
  onBlur,
  background = 'rgba(80,80,80,0.7)',
  ...props
}) => {
  const [hasBlurred, setHasBlurred] = useState(false);

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (!hasBlurred) setHasBlurred(true);
    if (onBlur) onBlur(e);
  };

  const showError = hasBlurred && error;

  return (
    <div className="relative">
      <input
        id={placeholder}
        placeholder=" "
        className={
          `input peer px-5 pt-10 pb-5 text-lg w-full focus:outline-white
          ${rounded ? 'rounded-full' : ''} 
          placeholder-transparent bg-[${background}] font-medium border-1 
          ${showError ? 'border-red-500' : success ? 'border-green-500' : 'border-gray-500'}`}
        onBlur={handleBlur}
        {...props}
      />

      <label
        htmlFor={placeholder}
        className={`absolute font-normal left-5 top-2 text-xs 
          transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-lg 
           peer-focus:top-2 peer-focus:text-xs 
         `}
      >
        {placeholder}
      </label>

      <div className="text-left flex items-center h-5 mt-1">
        {showError && (
          <span className="whitespace-nowrap text-sm text-red-500">
            <i className="fa-regular fa-circle-xmark"></i> {error}
          </span>
        )}
      </div>
    </div>
  );
};

export default CustomInput;
