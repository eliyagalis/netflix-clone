import React, { ReactNode } from 'react';

export type CardProps = {
    className?: string;
    children?: ReactNode;
};


const Card: React.FC<CardProps> = ({ className, children}) => {
    return (
        <div className={`card rounded-2xl p-5 flex flex-col h-full box-sizing border-2 shadow ${className}`}>
            {children}
        </div>
    );
};

export default Card;
