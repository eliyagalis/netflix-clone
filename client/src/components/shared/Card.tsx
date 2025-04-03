// import React from 'react';
// import Tv from '../../assets/Tv';
// import Down from '../../assets/Down';
// import Telescope from '../../assets/Telescope';
// import Profile from '../../assets/Profile';

// type CardProps = {
//     title: string;
//     subtitle: string;
//     plans?: boolean;
//     bulletPoints?: Array<{ id: number; bp: string }>;
//     additional?: string;
//     count: number;
//     price?: string;
//     img?: string;
// };

// const palette: Array<string> = [
//     "from-[rgba(0,70,199,0.5)] :to-[rgb(34,9,41)] hover:from-[rgba(0,70,199,0.7)] hover:to-[rgb(34,9,41)]",
//     "from-[rgba(190,0,238,0.5)] via-[rgb(29,24,46,0.5)] to-[rgb(34,9,41)] hover:from-[rgba(190,0,238,0.7)] hover:via-[rgb(29,24,46)] hover:to-[rgb(34,9,41)]",
//     "from-[rgba(238,0,186,0.5)] via-[rgb(87,23,68,0.5)] to-[rgb(34,9,41)] hover:from-[rgba(238,0,186,0.7)] hover:via-[rgb(87,23,68)] hover:to-[rgb(34,9,41)]",
// ];

// const Card: React.FC<CardProps> = ({ title, subtitle, plans, bulletPoints, price, count, img }) => {
//     return (
//         <div className={`card shadow border-2
//                 ${plans ? `customTransition border-[rgba(60,60,60,0.5)] 
//                 hover:scale-[1.02] cursor-pointer rounded-2xl bg-gradient-to-br ${palette[count]}`
//                 : "bg-[rgb(45,45,45)] border-[rgb(60,60,60)] rounded-xl"}`
//         }>
//             {plans && count === 2 &&
//                 <div className='absolute font-medium text-base right-0 px-2 bg-[rgba(230,230,230,0.3)] rounded-bl-xl rounded-tr-xl'>
//                     Most Popular
//                 </div>}

//             <div className='relative p-5 flex flex-col h-full justify-between box-sizing'>
//                 <>
//                     <h1 className={`card-title text-white ${plans ? "text-2xl" : "text-xl"}`}>
//                         {title}
//                     </h1>

//                     <p className={plans ? "text-xl font-medium text-[rgb(220,220,220)] my-2"
//                         : "text-base font-medium text-[rgb(170,170,170)]"}>
//                         {subtitle}
//                     </p>

//                     {bulletPoints &&
//                         bulletPoints.map((b) => (
//                             <p key={b.id} className="text-base text-[rgb(230,230,230)]">
//                                 <i className="fa-solid fa-check"></i> {b.bp}
//                             </p>
//                         ))}
//                 </>
//                 {plans ? (<div className='mt-auto text-xl font-medium text-[rgb(230,230,230)]'>
//                     {price}
//                 </div>) :
//                     (<div className='relative w-full flex justify-end'>

//                         {/* <img className='m-2 w-10 align-end' src={img} /> */}
//                         {(() => {
//                             switch (count) {
//                                 case 0:
//                                     return <Tv />;
//                                 case 1:
//                                     return <Down />;
//                                 case 2:
//                                     return <Telescope />
//                                 case 3:
//                                     return <Profile />    
//                                 default:
//                                     return null;
//                             }
//                         })()}
//                     </div>)
//                 }
//             </div>
//         </div>
//     );
// };

// export default Card;

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
