import React, { useRef } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import '../css/musicPlayer.css';
import { useAppDispatch, useAppSelector } from '../hooks/storeHooks';
import { defaultSongImage } from '../utils/constants';
import { handleSetCurrentSong } from '../redux/actions/music';
import { Link } from 'react-router-dom';

const MusicPlayer: React.FC = () => {
  const dispatch = useAppDispatch();
  const playlist = useAppSelector((state) => state.music.playlist);
  const currentSong = useAppSelector((state) => state.music.currentSong);
  const playerRef = useRef<AudioPlayer>(null);
  const nextSong =
    currentSong === undefined || playlist.length <= 1
      ? undefined
      : playlist.indexOf(currentSong) + 1 === playlist.length
      ? playlist[0]
      : playlist[playlist.indexOf(currentSong) + 1];
  const previousSong =
    currentSong === undefined || playlist.length <= 0
      ? undefined
      : playlist.indexOf(currentSong) - 1 >= 0
      ? playlist[playlist.indexOf(currentSong) - 1]
      : playlist[playlist.indexOf(currentSong) + 1];

  return currentSong && playlist.length > 0 ? (
    <div className='music-player'>
      <AudioPlayer
        header={
          <div className='music-top-bar'>
            <div className='song-header'>
              <img
                src={currentSong.image || defaultSongImage}
                alt='song image'
              />
              <div className='song-title-artist'>
                <h2>{currentSong.title}</h2>
                {currentSong.artist?.user.id && (
                  <Link to={`/profile/${currentSong.artist?.user.id}`}>
                    {currentSong.artist.full_name}
                  </Link>
                )}
              </div>
              <p>Now Playing</p>
            </div>
            {nextSong && (
              <div className='song-header'>
                <p>Up Next</p>
                <h2>{nextSong.title}</h2>
                <img
                  src={nextSong.image || defaultSongImage}
                  alt='song image'
                />
              </div>
            )}
          </div>
        }
        autoPlay
        ref={playerRef}
        src={currentSong.file}
        onEnded={() => dispatch(handleSetCurrentSong(nextSong))}
        onClickNext={() => dispatch(handleSetCurrentSong(nextSong))}
        onClickPrevious={() => dispatch(handleSetCurrentSong(previousSong))}
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
