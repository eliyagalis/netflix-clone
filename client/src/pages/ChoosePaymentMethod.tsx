import React from 'react'
import Typography from '../components/shared/Typography'
import { images } from '../data/images'
// import { useNavigate } from 'react-router-dom'
import { typography } from '../data/typography'
// import { useAppDispatch, useAppSelector } from '../store/store'
import PaymentMethodButton from '../components/ui/PaymentMethodButton'

const ChoosePaymentMethod:React.FC = () => {
  // const dispatch=useAppDispatch()
  // const step:number=useAppSelector((state)=>state.step);

  return (

      <div className='pt-[50px] flex flex-col items-center h-screen text-center'>
        <img src={images.payment.lockPic.src} alt={images.payment.lockPic.alt} className='w-[60px] h-[60px] my-10'/>
        <div className=' justify-center'>
          <Typography className="text-black my-0.5" size={typography.xsmall}>STEP 3 OF 3</Typography>
          <Typography className=' text-black font-semibold my-6 text-5xl' size="">Choose how to pay</Typography>
          <Typography className=' text-black font-light' size={typography.medium}>Your payment is encrypted and you can change how <br />
            you pay anytime.
          </Typography>
          <Typography className=' text-black font-medium my-3' size={typography.medium}>Secure for peace of mind. <br />Cancel easily online.</Typography>

          <PaymentMethodButton text="Credit or Debit Cart" imagesChildren={
            <>
              <img src={images.payment.visaLogo.src} alt={images.payment.visaLogo.alt} className='w-[3rem] h-[2rem] border !border-gray-300 rounded-sm mx-2' />
              <img src={images.payment.masterCardLogo.src} alt={images.payment.masterCardLogo.alt} className='w-[3rem] h-[2rem] border !border-gray-300 rounded-sm' />
            </>
          }/>
          <PaymentMethodButton text="Paypal" imagesChildren={<img src={images.payment.visaLogo.src} alt={images.payment.visaLogo.alt} className='w-[3rem] h-[2rem] border !border-gray-300 rounded-sm mx-2' />
          }/>
        </div>
          {/* const Typography:React.FC<TypographyProps> = ({children, className, size}) => {
        return (
        <p className={`${className} ${size}`}>{children}</p>
        )
      }
       */}
      </div>
      

  )
}

export default ChoosePaymentMethod