import React, { useEffect } from 'react'
interface PaypalLogicProps {
  planName:string,
  planId:string,
  paymentMethod:string,
}
const PaypalLogic:React.FC<PaypalLogicProps> = ({planName,planId,paymentMethod}) => {
  const [planId, setPlanId] = useState(second)
  const handleErrorPayment = (error:any) => {
    console.error("payment error",error);
  }
  const handleSuccessPayment = async(subscriptionId:string) => {
    console.log("payment success",subscriptionId);
    const subId=await axios.post('/http://localhost:3000/api/v1/payment/paypal/pay',{
      subscriptionId:subscriptionId,
      planName:planName,
      paymentMethod:paymentMethod,
    }
    ,{
      headers:{
        'Content-Type':'application/json'
      }
    })

  }
  // useEffect(() => {
  //   if(!window.paypal){

  //   }
  //   const script=document.createElement('script');
  //   script.src=`https://www.paypal.com/sdk/js?client-id=${process.env.REACT_APP_CLIENT_ID_PP}&vault=true&intent=subscription`;
  //   script.addEventListener('load',()=>{

  //   })
  // },[])
  return (
    <div>
    </div>
  )
}

export default PaypalLogic