import { zodResolver } from '@hookform/resolvers/zod';
import React, { ChangeEvent, useRef, useState } from 'react'
import { agreeToTermsPaypalDetails, PaypalOptionFormData } from '../../schemas/paypalMethodSchema';
import { useForm } from 'react-hook-form';
import CheckBoxPaypalOption from '../../components/ui/CheckBoxPaypalOption';
import Button from '../../components/shared/Button';
import { typography } from '../../data/typography';

const PaypalOptionForm = () => {
    const paypalButtonRef = useRef<HTMLDivElement | null>(null);
    const [isChecked, setIsChecked] = useState(false);

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
    
      const onSubmit = (data: PaypalOptionFormData) => {
        
      };
    
  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col mt-10'>
        <CheckBoxPaypalOption error={errors.agreeToTerms} isChecked={isChecked} register={register} handleChange={handleChange}/>
        <Button type='submit' className='mt-8 w-[30rem] h-[5rem] items-center' fontSize={typography.large}>Continue to PayPal</Button>
    </form>
  )
}

export default PaypalOptionForm