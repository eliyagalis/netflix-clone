import {useState} from 'react'
import Header from '../components/shared/Header'
import { Link } from 'react-router-dom'
import { typography } from '../data/typography'
import { colors } from '../data/colors'

const SignUpPage = () => {
    return (
        <div className={`text-${colors.text.primary}`}>
            <Header border={true}>
                <Link to="/login"
                    className={`${typography.small}
                        hover:underline font-medium`}>Sign In
                </Link>
            </Header>
        </div>)
}

export default SignUpPage