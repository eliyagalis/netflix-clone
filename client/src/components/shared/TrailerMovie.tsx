import React, { useState } from 'react'
import ReactPlayer from 'react-player';
import Button from './Button';


// import ytdl from 'ytdl-core';
type TrailerMovieProps = {
    url: string;
    initialMuted:boolean;
    // posterUrl:string;
    isPlaying?:boolean;
};
// isPlaying=true
const TrailerMovie: React.FC<TrailerMovieProps> = ({url,initialMuted}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  
return(
  <div className='w-full overflow-hidden object-cover aspect-video'>
    {/* <video
      src={url} muted={initialMuted}  autoPlay className='w-full object-cover brightness-50'
    /> */}
    {/* <iframe src={url}  frameborder="0"></iframe> */}
      <ReactPlayer
        url={url}// או קובץ MP4
        playing={isPlaying}
        muted={initialMuted}
        controls={true}
        width="100%"
        height="100%"
        style={{ position: 'absolute',objectFit:'cover',top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)', }}
      
        // playIcon={()=>return(

        // )}
        
        config={{
          youtube: {
             playerVars: {
              autoplay: 1,
              controls: 0,
              disablekb: 1,
              modestbranding: 1,
              rel: 0,
              fs: 0,
              iv_load_policy: 3,
              playsinline: 1,
            }
          }
        }}
    />
      {isPlaying &&(
        <Button className='rounded-full absolute bg-black hover:bg-gray-400 border-2 border-white z-999'>
          <i className='fa-solid fa-rotate-right text-white'/>
        </Button>
      )}
  </div>
  );
};

export default TrailerMovie