import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginFormData, loginSchema } from '../schemas/authSchema';
import CustomInput from '../components/shared/CustomInput';
import Button from '../components/shared/Button';
import { colors } from '../data/colors';
import { typography } from '../data/typography';
import { Link } from 'react-router-dom';

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
  });

  const onSubmit = (data: LoginFormData) => {
    console.log('Success', data);
    // Logic
    // navigate("/signup");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-md p-10 bg-[rgba(0,0,0,0.7)] rounded-lg shadow-md space-y-6 m-4"
    >
      <h2 className="text-2xl font-bold text-white">Sign In</h2>

      <div>
        <CustomInput
          placeholder="Email address"
          error={touchedFields.email ? errors.email?.message : undefined}
          {...register('email')}
        />
      </div>

      <div>
        <CustomInput
          placeholder="Password"
          type="password"
          error={touchedFields.password ? errors.password?.message : undefined}
          {...register('password')}
        />
      </div>

      <Button
        type="submit"
        color={colors.primary}
        className="w-full"
        fontSize={typography.xxsmall}
      >
        Sign In
      </Button>

      <Link className="w-full my-5 text-center underline text-white block hover:text-gray-300" to={"/"}>
        Forgot Password?
      </Link>
      <span className="text-gray-300">
        New to Netflix? <Link className="font-bold hover:underline" to={"/"}>Sign up now.</Link>
      </span>
    </form >
  );
};

export default LoginForm;
