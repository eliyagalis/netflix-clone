import React, { useState } from 'react';
import { addProfile, removeProfile, setCurrentProfile, setProfiles } from '../../store/slices/profilesSlice';
import ProfileCard from './ProfileCard';
import AddProfileCard from './AddProfileCard';
import EditProfileModal from './EditProfileModal';
import { IProfilePreview } from '../../types/IProfile';
import { useAppDispatch, useAppSelector } from '../../store/store';

const ProfileList: React.FC = () => {
  const { profiles } = useAppSelector((state) => state.profiles);
  const dispatch = useAppDispatch();

  const [editingProfile, setEditingProfile] = useState<IProfilePreview | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false); // NEW

  const handleAddProfile = () => {
    const newProfile: IProfilePreview = {
      id: Math.random().toString(36).substring(2, 10),
      avatar: 'https://wallpapers.com/images/hd/netflix-profile-pictures-1000-x-1000-88wkdmjrorckekha.jpg',
      name: 'New User',
    };
    dispatch(addProfile(newProfile));
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
  };

  const handleSave = (updatedProfile: IProfilePreview) => {
    const updatedProfiles = profiles.map((p) => p.id === updatedProfile.id ? updatedProfile : p);
    dispatch(setProfiles(updatedProfiles));
    setEditingProfile(null);
    setIsEditing(false);
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

      <button
        className="mt-10 text-white border border-gray-400 px-6 py-2 rounded 
        hover:bg-white hover:text-black transition hover:cursor-pointer"
        onClick={() => setIsEditing(!isEditing)}
      >
        {isEditing ? 'Done' : 'Manage'}
      </button>

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
