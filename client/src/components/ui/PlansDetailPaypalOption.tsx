import React from 'react'
import { typography } from '../../data/typography'
import Typography from '../shared/Typography'
import { useNavigate } from 'react-router-dom'

interface PropsPlan{
    planName:string,
    planPrice:number
}
const PlansDetailPaypalOption:React.FC<PropsPlan> = ({planName,planPrice}) => {
    const navigate=useNavigate()
  return (
    <div className='bg-gray-100 max-w-[30rem] max-h-[4rem] justify-between flex flex-row h-full w-full rounded-sm pl-7 pt-3'>
        <span className='flex flex-col'>
            <Typography className='font-semibold ' size={typography.small}>₪{planPrice}0/month</Typography>
            <span className='text-gray-500'>{planName.charAt(0).toUpperCase()+planName.substring(1,planName.length)}</span>
        </span>
        <button onClick={()=>navigate('/signup/planform')} className='pr-3 pb-3.5 bg-none border-none text-blue-600 font-semibold hover:opacity-80'>Change</button>
    </div>
  )
}

export default PlansDetailPaypalOption