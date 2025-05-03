import React, { useState } from 'react'
import Header from '../components/shared/Header'
import Button from '../components/shared/Button'
import { strings } from '../data/strings'
import Footer from '../components/shared/Footer'
import { colors } from '../data/colors'
import { typography } from '../data/typography'
import { Navigate } from 'react-router-dom'

const Logout = () => {
    const [out, setOut] = useState<boolean>(false);

    setTimeout(() => {
        setOut(true);
    }, 30000);

    return (
        <div className='min-h-screen bg-black'>
            <Header link='/'>
                <Button navLink={strings.landing.header.login.link} rounded>
                    {strings.landing.header.login.text}
                </Button>
            </Header>

            <main className="flex-1 max-w-270 w-11/12 mx-auto flex flex-col">
                <div className='h-auto w-100 mx-auto p-8 mt-20 bg-white'>
                    <h1 className={`${typography.large} my-2`}>Leaving So Soon?</h1>
                    <p>Just so you know, you don’t always need to sign out of Netflix. It’s only necessary if you’re on a shared or public computer.
                    </p>
                    <br />
                    <p>
                        You’ll be redirected to Netflix.com in 30 seconds.
                    </p>
                    <br />
                    <Button navLink='/' className='w-full bg-blue-500 hover:bg-blue-600'>Go Now</Button>
                </div>
            </main>

            {
                out && <Navigate to={"/"} replace />
            }

            <Footer className={`
                w-full bg-black 
                font-semibold ${colors.text.lightGray}
            `} />
        </div>
    )
}

export default Logout