import React from 'react'
import Card from '../shared/Card';
import { typography } from '../../data/typography';

type PlanCardProps = {
    className?: string;
    title: string;
    subtitle: string;
    bulletPoints?: Array<{ id: number; bp: string }>;
    type: keyof typeof palette;
    price?: string;
    navigate?: string; 
}

const palette = {
    1: "from-[rgba(0,70,199,0.5)] :to-[rgb(34,9,41)] hover:from-[rgba(0,70,199,0.7)] hover:to-[rgb(34,9,41)]",
    2: "from-[rgba(190,0,238,0.5)] via-[rgb(29,24,46,0.5)] to-[rgb(34,9,41)] hover:from-[rgba(190,0,238,0.7)] hover:via-[rgb(29,24,46)] hover:to-[rgb(34,9,41)]",
    3: "from-[rgb(78,28,73)] via-[rgb(29,24,46)] to-[rgb(34,9,41)] hover:from-[rgb(146,37,86)] hover:via-[rgb(47,22,60)] hover:to-[rgb(34,9,41)]",
};

const PlanCard: React.FC<PlanCardProps> = ({ className, title, subtitle, bulletPoints, price, type, navigate }) => {
    return (
        <Card className={`${className} bg-gradient-to-br ${palette[type]} transition-colors duration-300 border-[rgb(45,43,67)]`}>
            <div className={`${typography.medium} py-1 font-bold text-white`}>{title}</div>
            <div className={`${typography.small} py-1 font-bold text-[rgb(184,187,203)]`}>{subtitle}</div>

            {
                type === 3 &&
                <div className='absolute font-medium text-white top-0 right-0 px-2 pb-1 bg-[rgba(255,255,255,0.2)] rounded-bl-lg rounded-tr-xl'>
                    Most Popular
                </div>
            }

            <div className='flex flex-col justify-between h-auto flex-grow text-[rgb(184,187,203)]'>
                <ul className='list'>
                    {
                        bulletPoints && bulletPoints.map((b) =>
                        (
                            <li className={`list-row relative py-1 font-medium ${typography.xxsmall}`} key={b.id}>
                                <i className='absolute fa-solid fa-check top-1'></i>
                                {b.bp}
                            </li>
                        ))
                    }
                </ul>
                <div className={`${typography.small} flex items-end font-semibold text-[rgb(184,187,203)]`}>{price}</div>
            </div>
        </Card>
    )
}

export default PlanCard