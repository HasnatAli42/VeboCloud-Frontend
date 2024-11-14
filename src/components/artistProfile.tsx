import { useAppDispatch, useAppSelector } from '../hooks/storeHooks';
import { FileDownload, handleLikeSong, useGetProfile, useGetSongs } from '../api/api';
import { formatTrackLength } from '../utils/functions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faHeart, faDownload } from '@fortawesome/free-solid-svg-icons';
import playingImage from '../images/black_playing_queue.gif';
import { song } from '../utils/constants';
import { handlePlaySong } from '../redux/actions/music';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { environment } from '../environment/environment';
import { useState } from 'react';

const ArtistProfile = () => {
  const params = useParams();
  const [likedSongs, setLikedSongs] = useState<number[]>([]);
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.loggedInUser);
  const currentPlayingSong = useAppSelector((state) => state.music.currentSong);
  const { data } = useGetSongs();

  const artist = data?.find(
    (song) => song.artist?.user.id === Number(params.id)
  )?.artist;
  const { data: profile } = useGetProfile();
  const [follow, setFollow] = useState(false);

  const handleFollow = () => {
    setFollow(true);
    axios.post(
      environment.VITE_BACKEND_URL + `/artists/${artist?.id}/follow/`,
      {},
      {
        headers: { Authorization: `Bearer ${user?.access_token}` },
      }
    );
  };
  const handleClickPlay = (song: song) => {
    dispatch(handlePlaySong([], undefined));
    setTimeout(() => {
      dispatch(
        handlePlaySong(
          data?.filter((d) => d.artist?.user?.id === artist?.user.id) || [],
          song
        )
      );
    }, 1000);
  };
  return (
    <div className='artist-profile-container'>
      {artist?.user.id == user?.id && (
        <div className='edit-profile-button-container'>
          <button className='add-music' onClick={() => {}}>
            Edit Profile
          </button>
        </div>
      )}
      <div
        className='artist-header'
        style={{
          backgroundImage: `url(${artist?.cover_photo || ''})`,
        }}
      >
        <div className='artist-info'>
          {profile?.is_verified && (
            <span className='verified-badge'>✔ Verified Artist</span>
          )}
          <h1 className='artist-name'>{artist?.full_name}</h1>
        </div>
      </div>
      <div className='artist-actions'>
        <button className='play-btn'>
          <FontAwesomeIcon icon={faPlay} />
        </button>
        {artist?.user.id != user?.id && (
          <button className='follow-btn' onClick={() => handleFollow()}>
            {(artist?.id && profile?.followed_artists.includes(artist.id)) ||
            follow
              ? 'Following'
              : 'Follow'}
          </button>
        )}
        <p>{artist?.follower_count} Follower(s)</p>
      </div>
      <div className='track-list'>
        <h2>Popular</h2>
        {data
          ?.filter((d) => d.artist?.id === artist?.id)
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
                <FontAwesomeIcon
                  icon={faHeart}
                  className={`like-btn ${
                    profile?.liked_songs.includes(track.id) ||
                    likedSongs.includes(track.id)
                      ? 'liked'
                      : ''
                  }`}
                  onClick={() => {
                    const alreadyLiked = likedSongs.includes(track.id);
                    if (alreadyLiked)
                      setLikedSongs(likedSongs.filter((id) => id !== track.id));
                    else setLikedSongs([...likedSongs, track.id]);
                    handleLikeSong(track.id);
                  }}
                />
                <span>{track.like_count}</span>
              </div>
              <div className='track-download'>
                <FontAwesomeIcon icon={faDownload} onClick={()=> FileDownload(track.file, track.title)}/>
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
