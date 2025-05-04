import React from 'react'
import { IoVolumeMediumOutline } from "react-icons/io5";
import { BsVolumeMute } from "react-icons/bs";

type VolumeIndicatorProp={
    onClickVolume:()=>void;
    isMute:boolean
}
const VolumeIndicator:React.FC<VolumeIndicatorProp> = ({onClickVolume,isMute}) => {
  return (
    <button className=' rounded-full bg-none border-2 border-white pr-2 max-w-9 max-h-9 w-9 h-9 mr-4' onClick={onClickVolume}>
        {!isMute? ( <IoVolumeMediumOutline className=' max-w-8 max-h-8 w-8 h-8 items-center '/> ):( <BsVolumeMute className='max-w-8 max-h-8 w-8 h-8 items-center '/> ) }
    </button>
)
}

export default VolumeIndicator