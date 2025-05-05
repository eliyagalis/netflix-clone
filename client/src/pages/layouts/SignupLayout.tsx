import Header from '../../components/shared/Header'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { typography } from '../../data/typography'
import { colors } from '../../data/colors'
import Footer from '../../components/shared/Footer'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { resetProfiles } from '../../store/slices/profilesSlice'
import { logout } from '../../store/slices/authSlice'
import { logoutRequest } from '../../api/authApi'

type SignUpPageProps = {
    children?: React.ReactNode
}

const SignupLayout: React.FC<SignUpPageProps> = () => {
    const auth = useAppSelector((state) => state.auth)
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const logoutHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        dispatch(resetProfiles());
        dispatch(logout());
        logoutRequest();
        navigate('/logout');
    }

    return (
        <div className={`text-${colors.text.primary} bg-white min-h-screen w-full flex flex-col`}>
            <Header link='/' border>

                {
                    auth.user ? (
                        <button
                            className={`${typography.small} hover:underline font-medium`}
                            onClick={() => logoutHandler}
                        >
                            Log Out
                        </button>
                    ) : (
                        <Link to={'/login'}
                            className={`${typography.small} hover:underline font-medium`}>
                            {'Sign In'}
                        </Link>
                    )
                }


            </Header>

            <main className="flex-1 max-w-270 w-11/12 mx-auto flex flex-col text-black">
                <Outlet />
            </main>

            <Footer className={`
                w-full ${colors.background.lightWhite} 
                border-t-[0.5px] border-[rgb(230,230,230)] 
                font-semibold ${colors.text.lightGray}
            `} />
        </div >
    )
}

export default SignupLayout