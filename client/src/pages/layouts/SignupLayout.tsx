import Header from '../../components/shared/Header'
import { Link, Outlet } from 'react-router-dom'
import { typography } from '../../data/typography'
import { colors } from '../../data/colors'
import Footer from '../../components/shared/Footer'
import { useAppSelector } from '../../store/store'

type SignUpPageProps = {
    children?: React.ReactNode
}

const SignupLayout: React.FC<SignUpPageProps> = () => {
    const auth = useAppSelector((state)=>state.auth)

    return (
        <div className={`text-${colors.text.primary} bg-white min-h-screen w-full flex flex-col`}>
            <Header link='/' border>
                
                    <Link to={auth.isSignedIn ? '/logout': '/login'}
                        className={`${typography.small} hover:underline font-medium`}>
                        {auth.isSignedIn ? 'Log Out': 'Sign In'}
                    </Link>
            </Header>

            <main className="flex-1 max-w-270 w-11/12 mx-auto flex flex-col">
                <Outlet />
            </main>

            <Footer className={`
                w-full ${colors.background.lightWhite} 
                border-t-[0.5px] border-[rgb(230,230,230)] 
                font-semibold ${colors.text.lightGray}
            `} />
        </div>
    )
}

export default SignupLayout