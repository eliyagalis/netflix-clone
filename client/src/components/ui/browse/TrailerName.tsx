import React from 'react'
import { typography } from '../../../data/typography';

type TrailerName={
    name:string;
    isBigger:boolean;
}
const TrailerName = ({name,isBigger}) => {
  return (
    <div className={`${isBigger? typography.xlarge: typography.large}`}>{name}</div>
  )
}

export default TrailerName