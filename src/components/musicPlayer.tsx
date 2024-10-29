import React, { useRef } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import '../css/musicPlayer.css';
interface MusicPlayerProps {
  audioSrc: string;
}
const MusicPlayer: React.FC<MusicPlayerProps> = ({ audioSrc }) => {
  const playerRef = useRef<AudioPlayer>(null);

  const handleSeeked = () => {
    const audioElement = playerRef.current?.audio.current;
    if (audioElement) {
      console.log('Seeked to:', audioElement.currentTime);
    }
  };
  return (
    <div className='music-player'>
      <AudioPlayer
        autoPlay
        ref={playerRef}
        src={audioSrc}
        showSkipControls={true}
        showJumpControls={false}
        customAdditionalControls={[]}
        layout='horizontal'
        listenInterval={1000}
        onSeeked={handleSeeked}
      />
    </div>
  );
};

export default MusicPlayer;
