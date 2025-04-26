import React from 'react'
import Button from '../shared/Button'
import { colors } from '../../data/colors'
import { typography } from '../../data/typography'

interface LogoCard{
  text:string,
  imagesChildren: React.ReactElement<HTMLImageElement> | React.ReactElement<HTMLImageElement>[],
  navigateLink?:string
}
const PaymentMethodButton:React.FC<LogoCard> = ({text,imagesChildren,navigateLink}) => {
  return (
    <Button navLink={navigateLink? navigateLink:""} color={colors.buttons.secondary} border='border-gray-300' className='p-4 max-w-[40rem] h-[5rem] my-1 w-full font-light' fontSize={typography.medium}>
    <div className='flex justify-between flex-row w-full m-1.5'>
      <div className='flex flex-row'>
        <span className='text-left'> {text} </span>
        <span className='flex flex-row mx-4'>
          {imagesChildren}
        </span>
      </div>
      <span className=''><i className="fa-solid fa-chevron-right"></i></span>
    </div>
  </Button>
  )
}

export default PaymentMethodButton