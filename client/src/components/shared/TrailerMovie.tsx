import React from 'react'
import ReactPlayer from 'react-player';

type TrailerMovieProps = {
    url: string;
    handleVolume: () => boolean;
    width: string;
    height: string;
    isPlaying:boolean;
    className:string
};
//'https://www.youtube.com/watch?v=PMeHdc25BGE&pp=ygUFbW92aWU%3D'
const TrailerMovie: React.FC<TrailerMovieProps> = ({url,handleVolume,width='auto',height='full-screen',isPlaying=true,className}) => {
return(
    <div className={className? className: 'w-full h-auto'}>
      <ReactPlayer
        url={url} // או קובץ MP4
        playing={isPlaying}
        muted={handleVolume()}
        controls={false}
        width={width}
        height={height}
      />
    </div>
  );
};

export default TrailerMovie