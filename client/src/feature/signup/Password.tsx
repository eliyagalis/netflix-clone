import { typography } from '../../data/typography';
import Button from '../../components/shared/Button';
import { Navigate, useNavigate } from 'react-router-dom';
import CustomInput from '../../components/shared/CustomInput';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { PasswordFormData, passwordValidationSchema } from '../../schemas/authSchemas';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { nextStep } from '../../store/slices/stepsSlice';
import { loginRequest } from '../../api/authApi';
import { login } from '../../store/slices/authSlice';
import { UserStatus } from '../../types/IUser';
import { setProfiles } from '../../store/slices/profilesSlice';

const Password = () => {
    const dispatch = useAppDispatch();
    const signup = useAppSelector((state) => state.signup);
    const auth = useAppSelector((state) => state.auth);
    const step = useAppSelector((state) => state.step);
    const navigate = useNavigate();

    if (!signup.email) {
        return <Navigate to={"/login"} replace />
    }

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, touchedFields },
    } = useForm<PasswordFormData>({
        resolver: zodResolver(passwordValidationSchema),
        mode: 'onChange',
    });

    const onSubmit = async (data: { password: string }) => {
        try {
            const user = await loginRequest({email: signup.email, password: data.password});
            
            dispatch(login({ user }));
            dispatch(setProfiles(user.profiles ?? []));
            
            dispatch(nextStep());

            if (user.status?.toString() === UserStatus.ACTIVE) {
                navigate('/browse');
            } else {
                navigate('/signup');
            }
        } catch (error) {
            
        }
    };

    return (

        <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-100">
            <h3 className={`${typography.xxsmall} font-medium mt-10`}>STEP {step.currentStep} OF 3</h3>
            <h1 className={`${typography.large} font-semibold mb-3`}>
                Welcome back!
            </h1>
            <h1 className={`${typography.large} font-semibold mb-3`}>
                Joining Netflix is easy.
            </h1>
            <h6 className={`${typography.small}`}>Enter your password and you'll be watching in no time.
            </h6>

            <div className="my-2">
                Email
                <div className={`mt-0 ${typography.small} font-semibold`}>{signup.email}</div>
            </div>
            <div className="my-2">
                <CustomInput
                    placeholder="Enter your password"
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

export default Password;
