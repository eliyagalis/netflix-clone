import React from 'react'
import Typography from '../components/shared/Typography'
import { images } from '../data/images'
import Header from '../components/shared/Header'
import { useNavigate } from 'react-router-dom'

const ChoosePaymentMethod:React.FC = () => {
  const navigate=useNavigate();
  return (
    <div className=' bg-white'>
      <Header>
        <button onClick={()=>navigate('/')} className='right-0 text-gray-700 font-medium text-xl'>
          Sign Out
        </button>
      </Header>
      <hr/>
      <div className='pt-[50px] flex flex-col items-center h-screen'>
        <img src={images.payment.lockPic.src} alt={images.payment.lockPic.alt} className='w-[60px] h-[60px] my-12'/>
        <div className=' justify-center'>
          <Typography className='font-'/>
          <Typography className='font-medium text-black' size='text-4xl'>Choose how to pay</Typography>
        </div>
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