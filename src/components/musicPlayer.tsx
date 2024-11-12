import React, { useRef } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import '../css/musicPlayer.css';
import { useAppSelector } from '../hooks/storeHooks';
import { defaultSongImage } from '../utils/constants';

const MusicPlayer: React.FC = () => {
  const playlist = useAppSelector((state) => state.music.playlist);
  const currentSong = useAppSelector((state) => state.music.currentSong);
  const playerRef = useRef<AudioPlayer>(null);

  return currentSong && playlist.length > 0 ? (
    <div className='music-player'>
      <AudioPlayer
        header={
          <div className='song-header'>
            <img src={currentSong.image || defaultSongImage} alt='song image' />
            <h2>{currentSong.title}</h2>
          </div>
        }
        autoPlay
        ref={playerRef}
        src={currentSong.file}
        showSkipControls={true}
        showJumpControls={false}
        customAdditionalControls={[]}
        layout='horizontal'
        listenInterval={1000}
      />
    </div>
  ) : (
    <></>
  );
};

export default MusicPlayer;
