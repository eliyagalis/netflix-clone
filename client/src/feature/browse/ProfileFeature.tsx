import React, { useState } from 'react';
import ProfileCard from '../../components/browse/ProfileCard';
import { IProfilePreview } from '../../types/IProfile';

type ProfileFeatureProps = {
    profiles: IProfilePreview[];
    limit: number;
};

const ProfileFeature: React.FC<ProfileFeatureProps> = ({ profiles: initialProfiles, limit }) => {
    const [profiles, setProfiles] = useState<IProfilePreview[]>(initialProfiles);

    const addProfile = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const newProfile: IProfilePreview = { id: Date.now().toString(), avatar: '', name: 'New User' };
        setProfiles(prev => [...prev, newProfile]);
    };

    return (
        <div className="fixed top-0 left-0 flex items-center justify-center w-screen h-screen bg-[#141414] z-[100]">
            <div className="flex flex-wrap gap-6 max-w-4xl mx-auto justify-center">
                {profiles.map((profile) => (
                    <ProfileCard key={profile.id} profile={profile} />
                ))}

                {profiles.length < limit && (
                    <div className="flex flex-col items-center">
                        <button onClick={addProfile} 
                            className="flex items-center justify-center bg-gray-600 
                            hover:bg-gray-500 w-24 h-24 rounded-full transition hover:cursor-pointer">
                            <i className="fa-solid fa-plus text-4xl text-white" />
                        </button>
                        <p className="text-white mt-2 text-sm">Add Profile</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfileFeature;
