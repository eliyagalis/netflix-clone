import React from 'react'
import ReactPlayer from 'react-player';

const TrailerMovie: React.FC = () => {
return(
    <div className='w-full h-auto'>
      <ReactPlayer
        url='https://www.youtube.com/watch?v=PMeHdc25BGE&pp=ygUFbW92aWU%3D' // או קובץ MP4
        playing
        loop
        muted
        controls={false}
        width='auto'
        height='full-screen'
      />
    </div>
  );
};

export default TrailerMovie