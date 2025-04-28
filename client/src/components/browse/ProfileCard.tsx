import React from 'react'
import Profile from '../../assets/info-svgs/Profile'
import RedProfile from '../../assets/profiles/RedProfile'
import { IProfilePreview } from '../../types/IProfile'

const ProfileCard = ({profile}: {profile: IProfilePreview}) => {
  return (
    <div className='text-center text-gray-300'>
        <img className='w-30 rounded-sm hover:brightness-90 hover:cursor-pointer transition' 
            src={profile.avatar || 'https://wallpapers.com/images/hd/netflix-profile-pictures-1000-x-1000-88wkdmjrorckekha.jpg'} />
        {profile.name}
    </div>
  )
}

export default ProfileCard