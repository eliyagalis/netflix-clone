import React, { useState } from 'react';
import { typography } from '../../data/typography';
import { strings } from '../../data/strings';
import Button from '../../components/shared/Button';
import { useNavigate } from 'react-router-dom';
import CustomInput from '../../components/shared/CustomInput';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { SignupFormData, signupSchema } from '../../schemas/authSchema';

const Register = () => {
  const [userData, setUserData] = useState<{ email: string; password: string }>({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const {
      register,
      handleSubmit,
      watch,
      formState: { errors, touchedFields },
    } = useForm<SignupFormData>({
      resolver: zodResolver(signupSchema),
      mode: 'onChange',
      
    });

  const onSubmit = (data: SignupFormData) => {
    //logic
    navigate('/signup/planform');
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto max-w-[400px]"
    >
      <h3 className={`${typography.xxsmall} font-medium mt-10`}>
        STEP 1 OF 3
      </h3>
      <h1 className={`${typography.large} font-bold mb-3`}>
        Create a password to start your membership
      </h1>
      <h6 className={`${typography.small}`}>Just a few more steps and you're done!</h6>
      <h6 className={`${typography.small} mb-4`}>We hate paperwork, too.</h6>

      <div className="">
        <CustomInput
          placeholder="Email"
          background='white'
          placeholderColor='#555555'
          inputColor='black'
          error={errors.email?.message}
          success={touchedFields.email && !errors.email && !!watch('email')}
          {...register('email')}
        />
      </div>
      <div className="">
        <CustomInput
          placeholder="Add a password"
          type="password"
          background='white'
          placeholderColor='#555555'
          inputColor='black'
          error={errors.password?.message}
          success={touchedFields.password && !errors.password && !!watch('password')}
          {...register('password')}
        />
      </div>

      <div className="w-full flex">
        <Button type="submit" fontSize={typography.large} className={` w-full h-16 my-6 mx-auto`}>
          Next
        </Button>
      </div>
    </form>

  )
}

export default Register