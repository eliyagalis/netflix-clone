import React, {useCallback, useState } from 'react'
import PayPalButton from './PayPalButton';
import axios from 'axios';
import { typography } from '../../data/typography';
import { useAppSelector } from '../../store/store';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';

// import { useNavigate } from 'react-router-dom';
interface PaypalLogicProps {
  // planName:string,
  paymentMethod:string,
  isClicked:boolean
}
interface CompletedPayRes{
  message:string,
  subscriptionId:string,
  status:string
}
interface ValidatePlanRes{
  message:string,
  planId:string
}
// 

// const PaypalLogic:React.FC<PaypalLogicProps> = ({planName,paymentMethod}:PaypalLogicProps) => {

const PaypalLogic:React.FC<PaypalLogicProps> = ({paymentMethod,isClicked}:PaypalLogicProps) => {

  const navigate=useNavigate()
  const [successPayment, setSuccessPayment] = useState({status:false,msg:""});
  const planName=useAppSelector((state)=>state.plan.planName)
  // useEffect(() => { //למחוק אחר כך כשיהיה יוזר--
  //   const handelDeleteUserSubscription=async()=>{
  //     if(successPayment.status){
  //       return;
  //     }
  //     //cancelSubscription
  //     const res=await axios.post<CompletedPayRes>('http://localhost:3000/api/v1/payment/paypal/deleteUser',{
  //       paymentMethod:paymentMethod
  //     },{
  //         headers:{
  //           'Content-Type':'application/json'
  //         }
  //     })
  //     console.log(`${res.data.message}`)
  //   }
  //   handelDeleteUserSubscription();
  // },[])
  

  const handleSuccessPayment = useCallback(async (subscriptionId: string) => {
    console.log("payment success", subscriptionId);
    try {
      const res = await axios.post<CompletedPayRes>(
        'http://localhost:3000/api/v1/payment/paypal/paymentCompleted',
        {
          subscriptionId: subscriptionId,
          planName: planName,
          paymentMethod: paymentMethod
        },
        {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true  // Add this
        }
      );
      console.log("res data:", res.data.message);
      setSuccessPayment({ status: true, msg: "payment process success!" });
      navigate('/browse');
    } catch (error) {
      console.log(error);
    }
  }, [planName, paymentMethod, navigate]);
  const checkPlan = useCallback(async (): Promise<string | undefined> => {
    console.log("plan front:", planName);
    try {
      const response = await axios.post<ValidatePlanRes>(
        'http://localhost:3000/api/v1/payment/paypal/plansCheck',
        {
          paymentMethod: "paypal",
          planName: planName
        },
        {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true  // This tells axios to include cookies
        }
      );
      return response.data.planId as string;
    } catch (error) {
      setSuccessPayment({ 
        status: false, 
        msg: (error as AxiosError)?.response?.data?.message || 
             (error as AxiosError).message 
      });
      return undefined;
    }
  }, [planName]);
    // const afterSuccessfulPayment=()=>{
    //   ( <div>{successPayment.msg}</div>)
    //   setTimeout(()=>{
    //     setSuccessPayment({...successPayment,msg:""});
    //     navigate('/mainMoviePage')
    //   },3000)
    // } 
  return (
    <>
      <PayPalButton clicked={isClicked} onSuccess={handleSuccessPayment} checkPlan={checkPlan}/>
      {successPayment.status&&(
        <div className={`text-success font-medium ${typography.small}`}>
            payment process success
            

        </div>
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