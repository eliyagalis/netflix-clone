import React from 'react';

interface AddProfileCardProps {
  onAdd: () => void;
}

const AddProfileCard: React.FC<AddProfileCardProps> = ({ onAdd }) => {
  return (
    <div className="flex flex-col items-center cursor-pointer" onClick={onAdd}>
      <div className="w-24 h-24 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center">
        <i className="fa-solid fa-plus text-4xl text-white"></i>
      </div>
      <p className="text-white mt-2 text-sm">Add Profile</p>
    </div>
  );
};

export default AddProfileCard;
