import React from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import '../css/musicPlayer.css'
interface MusicPlayerProps {
  audioSrc: string;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ audioSrc }) => {
  return (
    <div className='music-player'>
      <AudioPlayer
        autoPlay
        src={audioSrc}
        showSkipControls={true}
        showJumpControls={false}
        customAdditionalControls={[]}
        // customVolumeControls={[]}
        layout='horizontal'
      />
    </div>
  );
};

export default MusicPlayer;
