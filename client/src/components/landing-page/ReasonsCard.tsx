import React, { ReactNode } from 'react'
import Card from '../shared/Card';
import { typography } from '../../data/typography';
import Tv from '../../assets/Tv';
import Down from '../../assets/Down';
import Telescope from '../../assets/Telescope';
import Profile from '../../assets/Profile';

type ReasonsCardProps = {
    className?: string;
    title: string;
    subtitle: string;
    svg?: number;
    children?: ReactNode;
    type: keyof typeof cardSvgs;
}

const cardSvgs = {
    1: <Tv />,
    2: <Down />,
    3: <Telescope />,
    4: <Profile />
}

const ReasonsCard: React.FC<ReasonsCardProps> = ({ className, title, subtitle, type }) => {
    return (
        <Card className={`${className} flex flex-col flex-grow h-auto bg-[rgb(39,39,39)] border-[rgb(48,48,48)]`}>
            <div className={`${typography.small} py-2 font-semibold text-white`}>{title}</div>
            <div className={` py-2 font-semibold text-[rgb(184,187,203)]`}>{subtitle}</div>
            <div className='flex justify-end items-end flex-grow'>
                {cardSvgs[type]}
            </div>
        </Card>
    )
}

export default ReasonsCard