import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../store/store';
import { typography } from '../../data/typography';
import Button from '../../components/shared/Button';

const Signup = () => {

    const auth = useAppSelector((state) => state.auth);
    const step = useAppSelector((state) => state.step);
    const navigate = useNavigate();
    if (auth.isSignedIn && auth.user?.subscriptionId) {
        return <Navigate to={'/browse'} />
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        navigate('/signup/planform');
    }

    return (
        <form onSubmit={handleSubmit} className='flex flex-col mx-auto w-80 md:items-center'>
            <img src='https://assets.nflxext.com/ffe/siteui/acquisition/simplicity/Checkmark.png' alt='check'
                className='w-15 mt-15'
            />
            <h3 className={`${typography.xxsmall} font-medium mt-3`}>
                STEP {step.step} OF 3
            </h3>
            <h1 className={`${typography.large} font-semibold mb-5`}>
                Choose your plan.
            </h1>
            <div className='w-9/10'>
                <div className='flex py-2'>
                    <i className='fa-solid fa-check text-red-600 text-2xl px-2' />
                    <p className={`px-3 ${typography.small}`}>No commitments, cancel anytime.</p>
                </div>
                <div className='flex py-2'>
                    <i className='fa-solid fa-check text-red-600 text-2xl px-2' />
                    <p className={`px-3 ${typography.small}`}>Everything on Netflix for one low price.</p>
                </div>
                <div className='flex py-2'>
                    <i className='fa-solid fa-check text-red-600 text-2xl px-2' />
                    <p className={`px-3 ${typography.small}`}>Unlimited viewing on all your devices.</p>
                </div>
            </div>
            <Button type="submit" className={`${typography.large} w-full max-w-100 h-16 my-6 mx-auto`}>
                Next
            </Button>
        </form>
    )
}

export default Signup