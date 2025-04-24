import React from 'react'
import { images } from '../data/images'
// import { useNavigate } from 'react-router-dom'
// import { useAppDispatch, useAppSelector } from '../store/store'
import PaymentMethodButton from '../components/ui/PaymentMethodButton'
import PaymentMethodText from '../components/ui/PaymentMethodText'

const PaymentPickerPage:React.FC = () => {
  // const dispatch=useAppDispatch()
  // const step:number=useAppSelector((state)=>state.step);

  return (

      <div className='pt-[50px] flex flex-col items-center h-screen text-center'>
        <img src={images.payment.lockPic.src} alt={images.payment.lockPic.alt} className='w-[60px] h-[60px] my-10'/>
        <div className=' justify-center'>
          <PaymentMethodText/>
          <span className='flex flex-row text-black font-light text-sm justify-end'>End-to-End encrypted 
            <img src={images.payment.yellowLock.src} alt={images.payment.yellowLock.alt} className='w-[2rem] h-[1.5rem]'/>
          </span>
          <PaymentMethodButton text="Credit or Debit Cart" imagesChildren={
            <>
              <img src={images.payment.visaLogo.src} alt={images.payment.visaLogo.alt} className='w-[3rem] h-[2rem] border !border-gray-300 rounded-sm mx-2' />
              <img src={images.payment.masterCardLogo.src} alt={images.payment.masterCardLogo.alt} className='w-[3rem] h-[2rem] border !border-gray-300 rounded-sm' />
            </>
          }/>
          <PaymentMethodButton navigateLink="/signup/paypalOption" text="Paypal" imagesChildren={<img src={images.payment.paypalLogo.src} alt={images.payment.visaLogo.alt} className='w-[3rem] h-[2.2rem] border !border-gray-300 rounded-sm mx-2 bg-white' />}/>

        </div>
      </div>
  )
}

export default PaymentPickerPage