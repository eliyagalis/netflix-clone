import React, { useState } from 'react';
import { IProfilePreview } from '../../types/IProfile';
import CustomInput from '../shared/CustomInput';
import Button from '../shared/Button';
import { colors } from '../../data/colors';

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
        <div className='flex flex-row mt-10 w-30 gap-5'>
          <Button onClickFunc={handleSave} className='rounded-none px-6' color={colors.buttons.secondary}>
            Save
          </Button>
          {
            profile.id && (
              <Button onClickFunc={() => profile.id && onDelete(profile.id)}
                className='rounded-none px-6 border-1 border-white' border='border-1' color={colors.buttons.dark}>
                Delete
              </Button>
            )
          }
          <Button onClickFunc={onClose} color={colors.buttons.dark} border='border-1' className="rounded-none px-6 border-1 border-white">
            Cancel
          </Button>

        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;
