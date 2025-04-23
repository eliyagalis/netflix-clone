import React from 'react'
import Typography from '../components/shared/Typography'
import { typography } from '../data/typography'
import {useAppSelector } from '../store/store'
import PlansDetailPaypalOption from '../components/ui/PlansDetailPaypalOption'

const PaypalOptionPage = () => {
  
    const planObj=useAppSelector((state)=>state.plan);
  return (
    <div className='pt-[3rem] text-black flex flex-col h-screen items-start text-left w-full max-w-[40rem]'>
        <Typography  size={typography.xxsmall}>STEP 3 OF 3</Typography>
        <Typography className=' font-semibold mb-6 text-4xl' size="">Set up your PayPal</Typography>
        <PlansDetailPaypalOption planName={planObj.planName} planPrice={planObj.price}/>
        <div className='max-w-[30rem] max-h-[5.5rem] justify-start flex flex-row h-full w-full border-2 mt-4 border-gray-200 rounded-sm pl-7 pt-3'>
            
        </div>
    </div>
  )
}

export default PaypalOptionPage