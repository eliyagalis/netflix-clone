import React from 'react'
import { PayPalButtons,PayPalScriptProvider } from '@paypal/react-paypal-js';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../store/store';
interface PayPalButtonProps {
    onSuccess:(subscriptionId:string)=>void,
    checkPlan:()=>Promise<string|undefined>;
    clicked:boolean
}

const PayPalButton:React.FC<PayPalButtonProps> = ({checkPlan,onSuccess}) => {
    const navigate=useNavigate();
    const planName=useAppSelector((state)=>state.plan);
  return (
    <PayPalScriptProvider options={{
        clientId:import.meta.env.VITE_CLIENT_ID_PP as string,
        vault:true,
        intent:"subscription"
    }}>
        <PayPalButtons style={{layout:'vertical',color:"gold",shape:'rect',label:'subscribe'}}
                createSubscription={async(_, actions) => {
                    if(!planName) {
                        console.error("Missing planName for subscription creation");
                        return Promise.reject(new Error("Missing plan name"));
                    }
                    const servicePlanId=await checkPlan();
                    if(!servicePlanId){
                        return Promise.reject(new Error("invalid plan"));
                    }
                    //TODO:BOM plan Id and userId req validations
                    return actions.subscription.create({
                        plan_id:servicePlanId!
                    });
                }}
                onApprove={async (data) => {
                    if (data.subscriptionID) {
                        console.log("subscription id :",data.subscriptionID);
                        onSuccess(data.subscriptionID);
                    } else {
                        console.error("Subscription ID is undefined or null.");
                    }
                }}
                onError={async(error) => {
                    console.error("Error creating subscription:", error);
                    navigate('/signup/planform') // Add a route for choosing a plan
                }}
            />

    </PayPalScriptProvider>
  )
}

export default React.memo(PayPalButton);

