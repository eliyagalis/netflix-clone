import React from 'react'
import Typography from '../shared/Typography'
import { typography } from '../../data/typography'

const PaymentMethodText = () => {
  return (
    <>
        <Typography className="text-black my-0.5" size={typography.xsmall}>STEP 3 OF 3</Typography>
        <Typography className=' text-black font-semibold my-6 text-5xl' size="">Choose how to pay</Typography>
        <Typography className=' text-black font-light' size={typography.medium}>
            Your payment is encrypted and you can change how <br />you pay anytime.
        </Typography>
        <Typography className=' text-black font-medium my-3.5' size={typography.medium}>Secure for peace of mind. <br />Cancel easily online.</Typography>
    </>
  )
}

export default PaymentMethodText