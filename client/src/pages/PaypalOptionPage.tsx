import React from 'react'
import Typography from '../components/shared/Typography'
import { typography } from '../data/typography'
import {useAppSelector } from '../store/store'
import PlansDetailPaypalOption from '../components/ui/PlansDetailPaypalOption'
import PaymentIcon from '../assets/PaymentIcon'
import PaypalOptionForm from '../feature/paypal/PaypalOptionForm'

const PaypalOptionPage = () => {
  
    const planObj = useAppSelector((state)=>state.plan);

  return (
    <div className='flex justify-center mx-auto'>
        <div className='pt-[3rem] text-black flex flex-col h-screen items-start text-left w-full max-w-[40rem]'>
        <Typography size={typography.xxsmall}>STEP 3 OF 3</Typography>
        <Typography className=' font-semibold mb-6 text-4xl' size="">Set up your PayPal</Typography>
        <PlansDetailPaypalOption planName={planObj.planName? planObj.planName: "premium"} planPrice={planObj.planPrice}/>
        <div className='max-w-[30rem] max-h-[5.5rem] justify-start flex flex-row h-full w-full border-2 mt-4 border-gray-200 rounded-sm pl-2 pr-2 pt-3'>
            <PaymentIcon className='max-h-[6rem] max-w-[6rem] w-full'/>
            <span >
                To finish signup, click the <span className='font-semibold'>Continue to PayPal </span>
                button and log in to PayPal using your email and password.
            </span>
        </div>
        <Typography className='max-w-[30rem] max-h-[5.5rem] justify-start h-full w-full mt-3 pl-2 pr-2 pt-3 text-gray-400 ' size={typography.xxsmall}>
            <>
                By checking the checkbox below, you agree to our <span className='text-blue-600'>Terms of Use, Privacy Statement</span>, and that you are over 18. 
                Netflix will automatically continue your membership and charge the membership fee
                (currently ₪{planObj.planPrice}/month) to your payment method until you cancel. You may cancel at any time to avoid future charges.
            </>
        </Typography>
        <PaypalOptionForm/>
    </div>

    </div>
  )
}

export default PaypalOptionPage