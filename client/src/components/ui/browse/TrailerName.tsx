import React from 'react'
import { typography } from '../../../data/typography';

type TrailerName={
    name:string;
    isBigger:boolean;
}
const TrailerName = ({name,isBigger}) => {
  return (
    <div className={`${isBigger? 'text-8xl': `text-8xl mb-8`} text-center italic font-extrabold my-4 mb-7`}>{name}</div>
  )
}

export default TrailerName