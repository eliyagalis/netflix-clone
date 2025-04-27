import React from 'react';

interface CarouselArrowProps {
  direction: 'left' | 'right';
  onClick: () => void;
}

export const CarouselArrow: React.FC<CarouselArrowProps> = ({ direction, onClick }) => {
  return (
    <button
      className={`btn absolute ${direction === 'left' ? '-left-5' : '-right-2'} z-10 w-2 py-15 bg-[rgba(145,145,145,0.5)] shadow-none rounded-xl border-0 font-thin text-white text-2xl`}
      onClick={onClick}
    >
      <i className={`fa-solid fa-chevron-${direction}`} />
    </button>
  );
};