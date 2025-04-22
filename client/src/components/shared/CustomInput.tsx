import React, { useState } from 'react';

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  error?: string;
  rounded?: boolean;
  success?: boolean;
  background?: string;
  placeholderColor?: string;
  inputColor?: string;
  className?: string;
}

const CustomInput: React.FC<CustomInputProps> = ({
  placeholder,
  error,
  rounded = false,
  success = false,
  onBlur,
  background = 'rgba(80,80,80,0.7)',
  placeholderColor = '#b3b3b4',
  inputColor = '#ffffff',
  className = '',
  ...props
}) => {
  const [hasBlurred, setHasBlurred] = useState(false);

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (!hasBlurred) setHasBlurred(true);
    if (onBlur) onBlur(e);
  };

  const showError = hasBlurred && !!error;

  return (
    <div className="relative w-full">
      <input
        id={placeholder}
        placeholder=" "
        onBlur={handleBlur}
        className={`${className}
          peer w-full px-5 pt-6 pb-2 text-lg font-medium border
          placeholder-transparent focus:outline-none
          ${rounded ? 'rounded-full' : 'rounded-md'}
          ${showError ? 'border-red-500' : success ? 'border-green-500' : 'border-gray-500'}
        `}
        style={{
          background: background,
          color: inputColor
        }}
        {...props}
      />

      <label
        htmlFor={placeholder}
        className={`
          absolute left-5 top-2 text-xs transition-all
          peer-placeholder-shown:top-5 peer-placeholder-shown:text-lg
          peer-focus:top-2 peer-focus:text-xs
        `}
        style={{ color: placeholderColor }}
      >
        {placeholder}
      </label>

        {showError && (
      <div className="h-5 mt-1 flex items-center text-left">
          <span
            id={`${placeholder}-error`}
            className="text-sm text-red-500 whitespace-nowrap"
          >
            <i className="fa-regular fa-circle-xmark mr-1"></i> {error}
          </span>
      </div>
        )}
    </div>
  );
};

export default CustomInput;
