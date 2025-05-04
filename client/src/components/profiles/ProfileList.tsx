import React, { useState } from 'react';
import { addProfile, removeProfile, setCurrentProfile, setProfiles } from '../../store/slices/profilesSlice';
import ProfileCard from './ProfileCard';
import AddProfileCard from './AddProfileCard';
import EditProfileModal from './EditProfileModal';
import { IProfilePreview } from '../../types/IProfile';
import { useAppDispatch, useAppSelector } from '../../store/store';
import Button from '../shared/Button';
import { colors } from '../../data/colors';
import { addProfileRequest } from '../../api/profilesApi';

const ProfileList: React.FC = () => {
  const { profiles } = useAppSelector((state) => state.profiles);
  const dispatch = useAppDispatch();

  const [editingProfile, setEditingProfile] = useState<IProfilePreview | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false); // NEW

  const handleAddProfile = async () => {
    const newProfile: IProfilePreview = {
      // id: new Date().getTime().toString(),
      avatar: 'https://wallpapers.com/images/hd/netflix-profile-pictures-1000-x-1000-88wkdmjrorckekha.jpg',
      name: 'New User',
    };
    setIsEditing(true);
    setEditingProfile(newProfile);
  };

  const handleEditClick = (profile: IProfilePreview) => {
    if (isEditing) {
      setEditingProfile(profile);
    } else {
      dispatch(setCurrentProfile(profile))
    }
  };

  const handleDelete = (id: string) => {
    dispatch(removeProfile(id));
    setEditingProfile(null);
    setIsEditing(false);
  };

  const handleSave = async (newProfile: IProfilePreview) => {
    try {
      await addProfileRequest();
      dispatch(addProfile(newProfile));
      setEditingProfile(null);
    } catch (error) {
      
    } finally {
      setIsEditing(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <div className="flex flex-wrap gap-6 justify-center">
        {profiles.map((profile) => (
          <ProfileCard key={profile.id} profile={profile} onEditClick={handleEditClick} isEditing={isEditing} />
        ))}
        {profiles.length < 5 && (
          <AddProfileCard onAdd={handleAddProfile} />
        )}
      </div>

      <Button
        color={isEditing? colors.buttons.primary : colors.buttons.dark} 
        border={isEditing? 'border-none' : 'border border-gray-400 rounded-none'}
        className={`mt-10 text-white px-6 py-2 
        ${!isEditing && 'hover:bg-white hover:text-black'}
        transition hover:cursor-pointer`}
        onClickFunc={() => setIsEditing(!isEditing)}
      >
        {isEditing ? 'Done' : 'Manage Profiles'}
      </Button>

      {editingProfile && (
        <EditProfileModal
          profile={editingProfile}
          onSave={handleSave}
          onDelete={handleDelete}
          onClose={() => setEditingProfile(null)}
        />
      )}
    </div>
  );
};

export default ProfileList;
