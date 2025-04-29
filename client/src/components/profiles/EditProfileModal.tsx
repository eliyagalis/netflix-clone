import React, { useState } from 'react';
import { IProfilePreview } from '../../types/IProfile';
import CustomInput from '../shared/CustomInput';

interface EditProfileModalProps {
  profile: IProfilePreview;
  onSave: (updatedProfile: IProfilePreview) => void;
  onDelete: (id: string) => void;
  onClose: () => void;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({ profile, onSave, onDelete, onClose }) => {
  const [name, setName] = useState(profile.name);

  const handleSave = () => {
    onSave({ ...profile, name });
  };

  return (
    <div className="fixed inset-0 bg-[#141414] flex flex-col items-center justify-center z-50">
      <div className="flex flex-col justify-between mt-4">
        <h2 className="text-white text-2xl my-5">Edit Profile</h2>
        <div className='flex gap-8 items-center'>
          <img className='w-30' src={profile.avatar} />
          <CustomInput placeholder='Profile Name' value={name} onChange={(e) => setName(e.target.value)} />
        </div>
      </div>
      <div className='flex flex-row justify-between gap-8 m-10'>
        <button onClick={handleSave} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded">
          Save
        </button>
        <button onClick={() => profile.id && onDelete(profile.id)} className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded">
          Delete
        </button>
        <button onClick={onClose} className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditProfileModal;
