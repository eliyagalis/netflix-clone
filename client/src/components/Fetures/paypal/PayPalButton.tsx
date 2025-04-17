import React from 'react'
import { PayPalButtons,PayPalScriptProvider } from '@paypal/react-paypal-js';

interface PayPalButtonProps {
    planId:string,
    onSuccess:(subscriptionId:string)=>void
}
const PayPalButton:React.FC<PayPalButtonProps> = ({planId,onSuccess}) => {
  return (
    <PayPalScriptProvider options={{
        clientId:process.env.REACT_APP_CLIENT_ID_PP as string,
        vault:true,
        intent:"subscription"
    }}>
        <PayPalButtons style={{layout:'vertical',color:'blue',shape:'rect',label:'subscribe'}}
            createSubscription={(data,actions)=>{
                return actions.subscription.create({
                    plan_id:planId
                });
            }}
            onApprove={(data)=>{
                console.log(data.subscriptionID);
                onSuccess(data.subscriptionID);
            }}
            onError={(error)=>{
                console.error("Error creating subscription:",error);
                //להפנות שוב לשלב של יצירת מנוי

            }}/>
    </PayPalScriptProvider>

  )
}

export default PayPalButton