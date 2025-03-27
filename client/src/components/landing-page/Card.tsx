import React from 'react';

type CardProps = {
    title: string;
    subtitle: string;
    plans?: boolean;
    bulletPoints?: Array<string>;
    additional?: string;
    count: number;
    price?: string;
};

const palette: Array<string> = [
    "from-[rgba(0,70,199,0.5)] :to-[rgb(34,9,41)] hover:from-[rgba(0,70,199,0.7)] hover:to-[rgb(34,9,41)]",
    "from-[rgba(190,0,238,0.5)] via-[rgb(29,24,46,0.5)] to-[rgb(34,9,41)] hover:from-[rgba(190,0,238,0.7)] hover:via-[rgb(29,24,46)] hover:to-[rgb(34,9,41)]",
    "from-[rgba(238,0,186,0.5)] via-[rgb(87,23,68,0.5)] to-[rgb(34,9,41)] hover:from-[rgba(238,0,186,0.7)] hover:via-[rgb(87,23,68)] hover:to-[rgb(34,9,41)]",
];

const Card: React.FC<CardProps> = ({ title, subtitle, plans, bulletPoints, price, count }) => {
    return (
        <div className={`card shadow border-2
                ${plans ? `bg-gradient-to-br ${palette[count]} border-[rgba(60,60,60,0.5)] 
                hover:scale-[1.02] transition-all duration-300 cursor-pointer rounded-2xl`
                : "bg-[rgb(45,45,45)] border-[rgb(60,60,60)] rounded-xl"}`
        }>
            {plans && count === 2 && <div className='absolute font-medium right-0 px-2 bg-[rgba(230,230,230,0.5)] rounded-bl-xl rounded-tr-xl'>Most Popular</div>}
            <div className='relative p-5 flex flex-col h-full justify-between box-sizing'>
                <div className="">
                    <h1 className={`card-title ${plans ? "text-2xl font-bold" : "text-xl"}`}>{title}</h1>
                    <p className={plans ? "text-2xl font-medium text-[rgb(230,230,230)] my-2"
                        : "text-base font-medium text-[rgb(170,170,170)]"}>
                        {subtitle}
                    </p>

                    {bulletPoints &&
                        bulletPoints?.map((b, index) => (
                            <p key={index} className="text-base text-[rgb(230,230,230)]">
                                <i className="fa-solid fa-check"></i> {b}
                            </p>
                        ))}
                </div>
                {plans && <div className='mt-auto text-xl font-medium text-[rgb(230,230,230)]'>{price}</div>}
            </div>
        </div>
    );
};

export default Card;
