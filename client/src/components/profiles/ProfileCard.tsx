import React from 'react';
import { IProfilePreview } from '../../types/IProfile';

interface ProfileCardProps {
  profile: IProfilePreview;
  onEditClick: (profile: IProfilePreview) => void;
  isEditing: boolean;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profile, onEditClick, isEditing }) => {
  return (
    <div 
      className="flex flex-col items-center cursor-pointer"
      onClick={() => onEditClick(profile)}
    >
      <div className="relative w-28 h-28 bg-gray-500 rounded overflow-hidden">
        <img
          src="https://wallpapers.com/images/hd/netflix-profile-pictures-1000-x-1000-88wkdmjrorckekha.jpg"
          alt={profile.name}
          className="w-full h-full object-cover"
        />

        {isEditing && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className='absolute top-0 left-0 w-full h-full bg-black opacity-50'/>
            <i className="absolute fa-solid fa-pen text-white text-2xl p-3 border-1 rounded-full"></i>
          </div>
        )}
      </div>
      <p className="text-white mt-2">{profile.name}</p>
    </div>
  );
};

export default ProfileCard;
