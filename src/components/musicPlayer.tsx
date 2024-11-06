import React, { useRef } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import '../css/musicPlayer.css';
interface MusicPlayerProps {
  audioSrc: string;
  title: string;
  image?: string;
}
const MusicPlayer: React.FC<MusicPlayerProps> = ({
  audioSrc,
  title,
  image,
}) => {
  const playerRef = useRef<AudioPlayer>(null);

  return (
    <div className='music-player'>
      <AudioPlayer
        header={
          <div className='song-header'>
            <img src={image} alt='song image' />
            <h2>{title}</h2>
          </div>
        }
        autoPlay
        ref={playerRef}
        src={audioSrc}
        showSkipControls={true}
        showJumpControls={false}
        customAdditionalControls={[]}
        layout='horizontal'
        listenInterval={1000}
      />
    </div>
  );
};

export default MusicPlayer;
