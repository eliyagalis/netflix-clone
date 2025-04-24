import React from 'react'

interface PaypalLogicWrapperProps {
    planName: string;
    paymentMethod: string;
}
const paypalLogicWarp: forwardRef<HTMLDivElement, PaypalLogicWrapperProps> = () => {
  return (
    <div>const PaypalLogicWrapper = React.forwardRef<HTMLDivElement, { planName: string; paymentMethod: string }>(
        ({ planName, paymentMethod }, ref) => (
          <div ref={ref}>
            <PaypalLogic planName={planName} paymentMethod={paymentMethod} />
          </div>
        )
      );
      </div>
  )
}

export default paypalLogicWarp