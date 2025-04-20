import React, {useState } from 'react'
import PayPalButton from './PayPalButton';
// import { useNavigate } from 'react-router-dom';
interface PaypalLogicProps {
  planName:string,
  planId:string,
  paymentMethod:string,
}
const PaypalLogic:React.FC<PaypalLogicProps> = ({planName,planId,paymentMethod}:PaypalLogicProps) => {

  // const navigate=useNavigate()
  const [successPayment, setSuccessPayment] = useState({status:false,msg:""});

  const handleSuccessPayment = async(subscriptionId:string) => {
    console.log("payment success",subscriptionId);
    try {
        await axios.post('/http://localhost:3000/api/v1/payment/paypal/paymentCompleted',{
          subscriptionId:subscriptionId,
          planName:planName,
          paymentMethod:paymentMethod
        },{
            headers:{
              'Content-Type':'application/json'
            }
        })
      setSuccessPayment({status:true,msg:"payment process success!"});
      //שליחה ליוזר את המנוי - אם יש לו מנוי יוכל להיכנס ולפסוח על זה
    } catch (error) {
      console.log(error)
    }
  }
    // const afterSuccessfulPayment=()=>{
    //   ( <div>{successPayment.msg}</div>)
    //   setTimeout(()=>{
    //     setSuccessPayment({...successPayment,msg:""});
    //     navigate('/mainMoviePage')
    //   },3000)
    // } 
  return (
    <>
      <PayPalButton onSuccess={handleSuccessPayment} planId={planId}/>
      {successPayment&&(
        <div>success payment</div>
      ) }
      {/* afterSuccessfulPayment() */}
    </>
  )
}

export default PaypalLogic

  // useEffect(() => {
  //   if(!window.paypal){

  //   }
  //   const script=document.createElement('script');
  //   script.src=`https://www.paypal.com/sdk/js?client-id=${process.env.REACT_APP_CLIENT_ID_PP}&vault=true&intent=subscription`;
  //   script.addEventListener('load',()=>{

  //   })
  // },[])