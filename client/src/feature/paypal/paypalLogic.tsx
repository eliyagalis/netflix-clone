import React, {useEffect, useState } from 'react'
import PayPalButton from './PayPalButton';
import axios from 'axios';
import { AxiosError } from 'axios';

// import { useNavigate } from 'react-router-dom';
interface PaypalLogicProps {
  planName:string,
  paymentMethod:string,
}
interface CompletedPayRes{
  message:string,
  subscriptionId:string,
  status:string
}
interface ValidatePlanAndUserRes{
  message:string,
  planId:string
}
const PaypalLogic:React.FC<PaypalLogicProps> = ({planName,paymentMethod}:PaypalLogicProps) => {

  // const navigate=useNavigate()
  const [successPayment, setSuccessPayment] = useState({status:false,msg:""});
  useEffect(() => {
    const handelDeleteUserSubscription=async()=>{
      if(successPayment.status){
        return;
      }
      //cancelSubscription
      const res=await axios.post<CompletedPayRes>('http://localhost:3000/api/v1/payment/paypal/deleteUser',{
        paymentMethod:paymentMethod
      },{
          headers:{
            'Content-Type':'application/json'
          }
      })
      console.log(`${res.data.message}`)
    }
    handelDeleteUserSubscription();
  },[])
  
  const handleSuccessPayment = async(subscriptionId:string) => {
    console.log("payment success",subscriptionId);
    try {
        const res=await axios.post<CompletedPayRes>('http://localhost:3000/api/v1/payment/paypal/paymentCompleted',{
          subscriptionId:subscriptionId,
          planName:planName,
          paymentMethod:paymentMethod
        },{
            headers:{
              'Content-Type':'application/json'
            }
        })
        console.log("res data:",res.data.message)
      setSuccessPayment({status:true,msg:"payment process success!"});
      //שליחה ליוזר את המנוי - אם יש לו מנוי יוכל להיכנס ולפסוח על זה
    } catch (error) {
      console.log(error)
    }
  }
  const checkPlanAndUser = async (planName: string): Promise<string|undefined> => {
    console.log("plan front:",planName)
    try {
      const response = await axios.post<ValidatePlanAndUserRes>('http://localhost:3000/api/v1/payment/paypal/plansCheck', {
        paymentMethod: "paypal",
        planName: planName
      });
      return response.data.planId as string;
    } catch (error) {
      setSuccessPayment({ status: false, msg: (error as AxiosError)?.response?.data?.message || (error as AxiosError).message });
      setTimeout(()=>{
        return "";
      }, 0);
    }
  };
    // const afterSuccessfulPayment=()=>{
    //   ( <div>{successPayment.msg}</div>)
    //   setTimeout(()=>{
    //     setSuccessPayment({...successPayment,msg:""});
    //     navigate('/mainMoviePage')
    //   },3000)
    // } 
  return (
    <>
      <PayPalButton onSuccess={handleSuccessPayment} checkPlanAndUser={checkPlanAndUser} planName={planName}/>
      {successPayment.status&&(
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