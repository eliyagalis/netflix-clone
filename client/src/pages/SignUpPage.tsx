import Header from '../components/shared/Header'
import { Link } from 'react-router-dom'
import { typography } from '../data/typography'
import { colors } from '../data/colors'
import { strings } from '../data/strings'

const SignUpPage = () => {
    return (
        <div className={`text-${colors.text.primary}`}>
            <Header link='/' border={true}>
                <Link to="/login"
                    className={`${typography.small}
                        hover:underline font-medium`}>Sign In
                </Link>
            </Header>

            <div className='min-h-screen max-w-270 mx-auto flex flex-col'>
                <div className='w-full flex flex-col'>
                    <h3 className={`${typography.xxsmall} font-medium mt-3`}>
                        STEP 1 OF 3
                    </h3>
                    <h1 className={`${typography.large} font-semibold my-2`}>
                        Choose the plan that’s right for you
                    </h1>
                </div>

                {Object.values(strings.signup.plans.note).map((n) => (
                    <p key={n} className={`${typography.xxsmall} my-2 ${colors.text.lightGray}`}>
                        {n}
                    </p>
                ))}

            </div>

        </div>)
}

export default SignUpPage