import React from 'react'
import Typography from '../components/shared/Typography'
import { typography } from '../data/typography'
import { useAppDispatch, useAppSelector } from '../store/store'

const PaypalOptionPage = () => {
    const dispatch=useAppDispatch();
    const planObj=useAppSelector((state)=>state.plan)
  return (
    <div className='pt-[3rem] text-black flex flex-col h-screen items-start text-left w-full max-w-[40rem]'>
        <Typography className="text-black" size={typography.xxsmall}>STEP 3 OF 3</Typography>
        <Typography className=' text-black font-semibold mb-6 text-4xl' size="">Set up your PayPal</Typography>
        <div className='bg-gray-100 max-w-[30rem] max-h-[4rem] h-full w-full rounded-sm'>bjk</div>
    </div>
  )
}

export default PaypalOptionPage