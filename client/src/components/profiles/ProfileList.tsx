import React, { useEffect, useState } from 'react';
import { addProfile, removeProfile, setCurrentProfile } from '../../store/slices/profilesSlice';
import ProfileCard from './ProfileCard';
import AddProfileCard from './AddProfileCard';
import EditProfileModal from './EditProfileModal';
import { IProfile, IProfilePreview } from '../../types/IProfile';
import { useAppDispatch, useAppSelector } from '../../store/store';
import Button from '../shared/Button';
import { colors } from '../../data/colors';
import { addProfileRequest, getProfileRequest } from '../../api/profilesApi';
import { useAuthStatus } from '../../hooks/useAuthStatus';

const ProfileList: React.FC = () => {
  const { loading } = useAuthStatus();
  const dispatch = useAppDispatch();

  const stateProfiles = useAppSelector((state) => state.profiles.profiles);

  const [profiles, setLocalProfiles] = useState<IProfilePreview[]>([]);
  const [editingProfile, setEditingProfile] = useState<IProfilePreview | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  // This effect runs AFTER loading becomes false
  useEffect(() => {
    if (!loading) {
      setLocalProfiles(stateProfiles);
    }
  }, [loading, stateProfiles]); // add stateProfiles to dependency so it stays in sync

  if (loading) return <div>Loading...</div>;

  const handleAddProfile = async () => {
    const newProfile: IProfilePreview = {
      id: new Date().getTime().toString(),
      avatar: 'https://wallpapers.com/images/hd/netflix-profile-pictures-1000-x-1000-88wkdmjrorckekha.jpg',
      name: 'New User',
    };
    setIsEditing(true);
    setEditingProfile(newProfile);
  };

  const handleEditClick = async (profile: IProfilePreview) => {
    if (isEditing) {
      setEditingProfile(profile);
    } else {
      try {
        console.log(profile.name);
        const data = await getProfileRequest(profile.id);
        if (data) {
          dispatch(setCurrentProfile(data));
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    }
  };

  const handleDelete = (id: string) => {
    dispatch(removeProfile(id));
    setLocalProfiles((prev) => prev.filter((p) => p.id !== id));
    setEditingProfile(null);
    setIsEditing(false);
  };

  const handleSave = async (newProfile: IProfilePreview) => {
    try {
      const fullProfile: IProfile = { ...newProfile, isKid: false, myList: [] };
      dispatch(addProfile(newProfile));
      setLocalProfiles((prev) => [...prev, newProfile]);
      await addProfileRequest(fullProfile);
      setEditingProfile(null);
    } catch (error) {
      console.error('Failed to save profile', error);
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
        color={isEditing ? colors.buttons.primary : colors.buttons.dark}
        border={isEditing ? 'border-none' : 'border border-gray-400 rounded-none'}
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
