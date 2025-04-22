import React from 'react'
import { PayPalButtons,PayPalScriptProvider } from '@paypal/react-paypal-js';
import { useNavigate } from 'react-router-dom';
interface PayPalButtonProps {
    planName:string,
    onSuccess:(subscriptionId:string)=>void,
    checkPlanAndUser:(planName:string)=>Promise<string|undefined>;
}
const PayPalButton:React.FC<PayPalButtonProps> = ({planName,checkPlanAndUser,onSuccess}) => {
    const navigate=useNavigate()

  return (
    <PayPalScriptProvider options={{
        clientId:import.meta.env.VITE_CLIENT_ID_PP as string,
        vault:true,
        intent:"subscription"
    }}>
        <PayPalButtons style={{layout:'vertical',color:'gold',shape:'rect',label:'subscribe'}}
            createSubscription={async(_, actions) => {
                if(!planName) {
                    console.error("Missing planName for subscription creation");
                    return Promise.reject(new Error("Missing plan name"));
                }
                const servicePlanId=await checkPlanAndUser(planName);
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
                navigate('/choosePlan') // Add a route for choosing a plan
            }}
        />
    </PayPalScriptProvider>

  )
}

export default PayPalButton

// //      <div id="paypal-button-container-P-9GT50560L5615082SNAAWG3Y"></div>
// <script src="https://www.paypal.com/sdk/js?client-id=AYjAWvcwwDc1USNaKZ_Oc-5LlZxKXPk3Y1McezDyxdO_n4G8FjB9c6vn8uYAmHRRTkdwIuckVz2xegGp&vault=true&intent=subscription" data-sdk-integration-source="button-factory"></script>
// <script>
//   paypal.Buttons({
//       style: {
//           shape: 'rect',
//           color: 'gold',
//           layout: 'horizontal',
//           label: 'subscribe'
//       },
//       createSubscription: function(data, actions) {
//         return actions.subscription.create({
//           /* Creates the subscription */
//           plan_id: 'P-9GT50560L5615082SNAAWG3Y'
//         });
//       },
//       onApprove: function(data, actions) {
//         alert(data.subscriptionID); // You can add optional success message for the subscriber here
//       }
//   }).render('#paypal-button-container-P-9GT50560L5615082SNAAWG3Y'); // Renders the PayPal button
// </script>