import React, { useEffect } from 'react'
import { useAppSelector } from '../../store/store'

const MyList = () => {
    const {currentProfile} = useAppSelector((state)=>state.profiles);

    return (
        <div>
            {
                currentProfile?.myList.map((item)=>
                (
                    <div key={item.id}>{item.id}</div>
                ))
            }
        </div>
    )
}

export default MyList