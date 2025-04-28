import { zodResolver } from '@hookform/resolvers/zod';
import React, { ChangeEvent,  useState } from 'react'
import { agreeToTermsPaypalDetails, PaypalOptionFormData } from '../../schemas/paypalMethodSchema';
import { useForm } from 'react-hook-form';
import CheckBoxPaypalOption from '../../components/ui/CheckBoxPaypalOption';
import Button from '../../components/shared/Button';
import { typography } from '../../data/typography';
import PaypalLogic from './paypalLogic';

const PaypalOptionForm = () => {
    const [isChecked, setIsChecked] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
      setIsChecked(e.target.checked);
    };
    const {
        register, //מקשר את האינפוטים לשדה הטופס 
        handleSubmit,//בודק אם אין שגיאות אם אין יפעיל את הפונקציה
        formState: { errors }, //שולף את השגיאות מתוך הטופס
      } = useForm<PaypalOptionFormData>({ //תבנה טופס לפי ההגדרה הזו 
        resolver: zodResolver(agreeToTermsPaypalDetails), //תשתמש בואלידציה לפי הסכמה
      });

    // Function to programmatically click the PayPal button
   
      const onSubmit = () => {
       setIsClicked(true)
      };
    
  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col mt-10'>
    
        <CheckBoxPaypalOption error={errors.agreeToTerms} isChecked={isChecked} register={register} handleChange={handleChange}/>
        <div className='relative '>
            <Button type='submit' className={`mt-8 w-[30rem] h-[5rem] items-center z-[999] ${!isChecked? "disabled cursor-not-allowed ":"visible"}`} fontSize={typography.large}>Continue to PayPal</Button>
            {isChecked&& (
                <div className="absolute inset-0 opacity-0 z-10">
                  {/* //planName={planNameFromStore} */}
                    <PaypalLogic isClicked={isClicked}  paymentMethod="paypal"/>
                </div>
            )}
            
        </div>

    </form>
  )
}

export default PaypalOptionForm