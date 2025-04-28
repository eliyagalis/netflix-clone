import { useState } from 'react';
import { typography } from '../../data/typography';
import Button from '../../components/shared/Button';
import { useNavigate } from 'react-router-dom';
import CustomInput from '../../components/shared/CustomInput';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { SignupFormData, signupSchema } from '../../schemas/authSchemas';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { nextStep } from '../../store/slices/stepsSlice';
import { setEmail } from '../../store/slices/signupSlice';

const Regform = () => {
  const dispatch = useAppDispatch();
  const signup = useAppSelector((state) => state.signup);
  const plan = useAppSelector((state) => state.plan);
  const step = useAppSelector((state) => state.step);
  const auth = useAppSelector((state) => state.auth);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, touchedFields },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    mode: 'onChange',
    defaultValues: {
      email: signup?.email,
      password: '',
    },
  });

  const onSubmit = (data: { email: string; password: string }) => {
    dispatch(setEmail(data.email));
    dispatch(nextStep());
    
    if(plan.planName) 
      navigate('/signup/paymentPicker');
  
    else navigate('/signup/planform');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-100">
      <h3 className={`${typography.xxsmall} font-medium mt-10`}>STEP {step.currentStep} OF 3</h3>
      <h1 className={`${typography.large} font-semibold mb-3`}>
        Create a password to start your membership
      </h1>
      <h6 className={`${typography.small}`}>Just a few more steps and you're done!</h6>
      <h6 className={`${typography.small} mb-4`}>We hate paperwork, too.</h6>

      <div className="my-2">
        <CustomInput
          className="focus:ring-blue-500"
          placeholder="Email"
          background="white"
          placeholderColor="#555555"
          inputColor="black"
          error={errors.email?.message}
          success={touchedFields.email && !errors.email && !!watch('email')}
          {...register('email')}
        />
      </div>
      <div className="my-2">
        <CustomInput
          placeholder="Add a password"
          type="password"
          background="white"
          placeholderColor="#555555"
          inputColor="black"
          error={errors.password?.message}
          success={touchedFields.password && !errors.password && !!watch('password')}
          {...register('password')}
        />
      </div>

      <div className="w-full flex">
        <Button type="submit" fontSize={typography.large} className="w-full h-16 my-6 mb-18 mx-auto">
          Next
        </Button>
      </div>
    </form>
  );
};

export default Regform;
