import React from 'react'
import { IoVolumeMediumOutline } from "react-icons/io5";
import { BsVolumeMute } from "react-icons/bs";

type VolumeIndicatorProp={
    onClickVolume:()=>void;
    isMute:boolean
}
const VolumeIndicator:React.FC<VolumeIndicatorProp> = ({onClickVolume,isMute}) => {
  return (
    <button className='rounded-full bg-none border-2 border-white' onClick={()=>onClickVolume}>
        {isMute? ( <IoVolumeMediumOutline /> ):( <BsVolumeMute /> ) }
    </button>
)
}

export default VolumeIndicator