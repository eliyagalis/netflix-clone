import React from 'react'
import ReactPlayer from 'react-player';


// import ytdl from 'ytdl-core';
type TrailerMovieProps = {
    url: string;
    playerRef: React.RefObject<ReactPlayer|null>;
    // posterUrl:string;
    isPlaying?:boolean;

};
// isPlaying=true
const TrailerMovie: React.FC<TrailerMovieProps> = ({url, playerRef}) => {

return(
  <div className='w-full overflow-hidden object-cover aspect-video'>
      <ReactPlayer
        ref={playerRef}
        url={url}// או קובץ MP4
        // playing={isPlaying}
        muted={true}
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
  </div>
  );
};

export default TrailerMovie