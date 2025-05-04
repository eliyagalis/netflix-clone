import React, { useEffect } from 'react'
import { useAppSelector } from '../../store/store'

const MyList = () => {
    const {currentProfile} = useAppSelector((state)=>state.profiles);

    return (
        <div className='flex w-full'>
            {
                currentProfile?.myList.map((item)=>
                (
                    <div key={item.contentId} className='flex flex-col w-20'>
                        <img src={item.poster || ""} />
                        <div className='text-lg text-white'>{item.title}</div>
                    </div>
                ))
            }
        </div>
    )
}

export default MyList