import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginFormData, loginSchema } from '../../schemas/authSchemas';
import CustomInput from '../../components/shared/CustomInput';
import Button from '../../components/shared/Button';
import { typography } from '../../data/typography';
import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../store/store';
import { useDispatch } from 'react-redux';
import { loginRequest } from '../../api/authApi';
import { useState } from 'react';
import Toast from '../../components/shared/Toast';
import { login } from '../../store/slices/authSlice';

const LoginForm = () => {
  const [toast, setToast] = useState<string | null>(null);

  const auth = useAppSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, touchedFields },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setToast(null);
      const user = await loginRequest(data);
      dispatch(login({ user }));

      if (user.status?.toString() === 'ACTIVE') {
        navigate('/browse');
      } else {
        navigate('/signup');
      }
    } catch (error: any) {
      if (error.response?.status === 404)
        setToast("Sorry, we can't find an account with this email address. Please try again or create a new account.");
      else
        setToast(error.response?.data?.message || "Login failed.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full min-h-120 max-w-md p-10 bg-[rgba(0,0,0,0.7)] rounded-lg shadow-md space-y-4 m-4"
    >
      <h2 className="text-2xl font-bold text-white">Sign In</h2>

      {toast && (
        <div className="alert alert-warning rounded text-lg p-2 mb-4">
          {toast}
        </div>
      )}

      <div>
        <CustomInput
          className="blackInput"
          placeholder="Email address"
          background="#121212"
          error={errors.email?.message}
          success={touchedFields.email && !errors.email && !!watch('email')}
          {...register('email')}
        />
      </div>

      <div>
        <CustomInput
          className="blackInput"
          placeholder="Password"
          type="password"
          background="#121212"
          error={errors.password?.message}
          success={touchedFields.password && !errors.password && !!watch('password')}
          {...register('password')}
        />
      </div>

      <Button type="submit" className="w-full" fontSize={typography.xxsmall}>
        Sign In
      </Button>

      <Link type="button" className="w-full my-5 text-center underline text-white block hover:text-gray-300" to={'/'}>
        Forgot Password?
      </Link>
      <div className="flex items-center mb-4">
        <input
          type="checkbox"
          id="rememberMe"
          className="checkbox w-5 h-5 checkbox-neutral border-gray-300 rounded-sm checked:bg-white checked:text-black"
          title="Remember me"
        />
        <label htmlFor="rememberMe" className="text-gray-300 ml-2">
          Remember me
        </label>
      </div>
      <span className="text-gray-300">
        New to Netflix?{' '}
        <Link type="button" className="font-bold hover:underline" to={'/'}>
          Sign up now.
        </Link>
      </span>
    </form>
  );
};

export default LoginForm;
