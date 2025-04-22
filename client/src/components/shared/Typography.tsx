import React from 'react'

type TypographyProps = {
    children: React.ReactNode;
    className?: string;
    size?: string;
    bold?: boolean;
}

const Typography:React.FC<TypographyProps> = ({children, className, size}) => {
  return (
  <p className={`${className} ${size}`}>{children}</p>
  )
}

export default Typography