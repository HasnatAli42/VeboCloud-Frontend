import React from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/storeHooks';
import { useGetSongs } from '../api/api';
import { formatTrackLength } from '../utils/functions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faHeart, faDownload } from '@fortawesome/free-solid-svg-icons';
import playingImage from '../images/black_playing_queue.gif';
import { song } from '../utils/constants';
import { handlePlaySong } from '../redux/actions/music';

const ArtistProfile: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.loggedInUser);
  const currentPlayingSong = useAppSelector((state) => state.music.currentSong);
  const { data, isLoading } = useGetSongs();

  const handleClickPlay = (song: song) => {
    dispatch(handlePlaySong([], undefined));
    setTimeout(() => {
      dispatch(
        handlePlaySong(
          data?.filter((d) => d.artist?.id === user?.id) || [],
          song
        )
      );
    }, 1000);
  };
  return (
    <div className='artist-profile-container'>
      <div
        className='artist-header'
        style={{ backgroundImage: `url(${user?.image})` }}
      >
        <div className='artist-info'>
          <span className='verified-badge'>✔ Verified Artist</span>
          <h1 className='artist-name'>{`${user?.first_name} ${user?.last_name}`}</h1>
          <p className='monthly-listeners'>418,466 monthly listeners</p>
        </div>
      </div>
      <div className='artist-actions'>
        <button className='play-btn'>
          <FontAwesomeIcon icon={faPlay} />
        </button>
        <button className='follow-btn'>Following</button>
      </div>
      <div className='track-list'>
        <h2>Popular</h2>
        {data
          ?.filter((d) => d.artist?.id === user?.id)
          ?.map((track, index) => (
            <div className='track-item' key={track.id}>
              <div className='track-id'>
                <span className='track-number'>{index + 1}</span>
                <div
                  className='play-icon'
                  onClick={() => handleClickPlay(track)}
                >
                  <FontAwesomeIcon icon={faPlay} />
                </div>
                <div className='track-title'>{track.title}</div>
                <div className='track-playing-image'>
                  {currentPlayingSong?.id === track.id && (
                    <img src={playingImage} />
                  )}
                </div>
              </div>
              <div className='track-likes'>
                <FontAwesomeIcon icon={faHeart} className='love-icon' />
                <span>{200}</span>
              </div>
              <div className='track-download'>
                <FontAwesomeIcon icon={faDownload} />
              </div>
              <div className='track-duration'>
                {formatTrackLength(track.length)}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ArtistProfile;
