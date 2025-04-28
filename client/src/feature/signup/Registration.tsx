import React from 'react'
import { images } from '../../data/images'
import { typography } from '../../data/typography'
import Button from '../../components/shared/Button'
import { useNavigate } from 'react-router-dom'

const Registration = () => {
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        navigate('/signup/regform');
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="mx-auto max-w-[350px] text-left md:text-center flex flex-col items-center" 
        >
            <img src={images.registration.src} alt={images.registration.alt} className='w-full px-15 py-8 mt-30' />
            <h3 className={`${typography.xxsmall} font-medium`}>
                STEP 1 OF 3
            </h3>
            <h1 className={`${typography.large} font-bold mb-3`}>
                Finish setting up your account
            </h1>
            <h6 className={`${typography.small} mt-1`}>Netflix is personalized for you.</h6>
            <h6 className={`${typography.small} mb-4`}>Create a password to start watching Netflix.</h6>

            <Button type="submit" className={`${typography.large} w-full max-w-100 h-16 my-6 mx-auto mb-20`}>
                Next
            </Button>
        </form>
    )
}

export default Registration