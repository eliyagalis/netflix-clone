import Header from '../components/shared/Header'
import { Link, Outlet } from 'react-router-dom'
import { typography } from '../data/typography'
import { colors } from '../data/colors'
import Footer from '../components/shared/Footer'

type SignUpPageProps = {
    children?: React.ReactNode
}

const SignupLayout:React.FC<SignUpPageProps> = () => {
    return (
        <div className={`text-${colors.text.primary} bg-white min-h-screen w-full flex flex-col`}>
            <Header link='/' border>
                <div></div>            
                <Link to="/login"
                    className={`${typography.small} hover:underline font-medium`}>
                    Sign In
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