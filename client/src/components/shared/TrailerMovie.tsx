import React, { useState } from 'react'
import ReactPlayer from 'react-player';


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
      <ReactPlayer
        url={url}// או קובץ MP4
        playing={isPlaying}
        muted={initialMuted}
        controls={true}
        width="100%"
        height="100%"
        style={{ position: 'absolute', top: 0, left: 0 }}
        // light={posterUrl}
        
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
              origin: window.location.origin
            }
          }
        }}
    />
  );
};

export default TrailerMovie