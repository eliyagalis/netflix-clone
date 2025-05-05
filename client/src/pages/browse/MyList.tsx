import React, { useEffect } from 'react'
import { useAppSelector } from '../../store/store'

const MyList = () => {
    const {currentProfile} = useAppSelector((state)=>state.profiles);

    return (
        <div className='flex w-11/12 mx-auto'>
            {
                currentProfile?.myList ? currentProfile?.myList.map((item)=>
                (
                    <div key={item.contentId} className='flex flex-col w-20'>
                        <img src={item.poster || ""} className='w-full'/>
                    </div>
                )):(
                    <div>
                        Nothing to show here...
                    </div>
                )
            }
        </div>
    )
}

export default MyList