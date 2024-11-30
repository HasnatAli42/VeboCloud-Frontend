import { useAppDispatch, useAppSelector } from '../hooks/storeHooks';
import {
  FileDownload,
  handleLikeSong,
  useGetProfile,
  useGetSongs,
} from '../api/api';
import { formatTrackLength } from '../utils/functions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlay,
  faHeart,
  faDownload,
  faEnvelope,
} from '@fortawesome/free-solid-svg-icons';
import playingImage from '../images/black_playing_queue.gif';
import { faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { environment } from '../environment/environment';
import { handlePlaySong } from '../redux/actions/music';
import { song } from '../utils/constants';

const ArtistProfile = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const params = useParams();
  const search = useAppSelector((state) => state.music.searchTerm);
  const user = useAppSelector((state) => state.auth.loggedInUser);
  const currentPlayingSong = useAppSelector((state) => state.music.currentSong);

  const { data: songs } = useGetSongs(search);
  const { data: profile } = useGetProfile();

  const [followChange, setFollowChange] = useState(0);
  const [followingArtist, setFollowingArtist] = useState<boolean | null>(null);
  const [likedSongs, setLikedSongs] = useState<number[] | null>(null);

  const artist = songs?.find(
    (song) => song.artist?.user.id === Number(params.id)
  )?.artist;

  useEffect(() => {
    if (profile && likedSongs === null) {
      setLikedSongs(profile.liked_songs);
    }
    if (artist && profile && followingArtist === null) {
      setFollowingArtist(profile.followed_artists.includes(artist.id));
    }
  }, [artist, profile]);

  const handleFollow = async () => {
    setFollowChange(
      followChange === 0
        ? followingArtist
          ? -1
          : 1
        : followChange === 1
        ? 0
        : 1
    );

    await axios.post(
      `${environment.VITE_BACKEND_URL}/artists/${artist?.id}/follow/`,
      {},
      { headers: { Authorization: `Bearer ${user?.access_token}` } }
    );
  };

  const handleLike = async (trackId: number) => {
    const alreadyLiked = likedSongs?.includes(trackId);
    setLikedSongs((prev) =>
      alreadyLiked
        ? (prev || []).filter((id) => id !== trackId)
        : [...(prev || []), trackId]
    );
    await handleLikeSong(trackId);
  };

  const handleClickPlay = (song: song) => {
    dispatch(handlePlaySong([], undefined));
    setTimeout(() => {
      const artistSongs =
        songs?.filter((d) => d.artist?.user.id === artist?.user.id) || [];
      dispatch(handlePlaySong(artistSongs, song));
    }, 1000);
  };

  const getSongLink = (songId: number) =>
    `${environment.VITE_VEBO_CLOUD_FRONTEND_URL}/songs?songid=${songId}`;

  if (!artist) return null;

  return (
    <div className='artist-profile-container'>
      {artist.user.id == Number(user?.id) && (
        <div className='edit-profile-button-container'>
          <button
            className='add-music'
            onClick={() => navigate('/editprofile')}
          >
            Edit Profile
          </button>
        </div>
      )}
      <div
        className='artist-header'
        style={{ backgroundImage: `url(${artist?.cover_photo || ''})` }}
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
        {artist?.user.id != Number(user?.id) && (
          <button className='follow-btn' onClick={handleFollow}>
            {followingArtist || followChange === 1 ? 'Following' : 'Follow'}
          </button>
        )}
        <p>{(artist?.follower_count || 0) + followChange} Follower(s)</p>
      </div>
      <div className='track-list'>
        <h2>Popular</h2>
        {songs
          ?.filter((track) => track.artist?.id === artist?.id)
          .map((track, index) => (
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
                {currentPlayingSong?.id === track.id && (
                  <img src={playingImage} alt='Playing' />
                )}
              </div>
              <div className='track-likes'>
                <FontAwesomeIcon
                  icon={faHeart}
                  className={`like-btn ${
                    likedSongs?.includes(track.id) ? 'liked' : ''
                  }`}
                  onClick={() => handleLike(track.id)}
                />
                <span>
                  {track.like_count +
                    (likedSongs?.includes(track.id) &&
                    !profile?.liked_songs.includes(track.id)
                      ? 1
                      : !likedSongs?.includes(track.id) &&
                        profile?.liked_songs.includes(track.id)
                      ? -1
                      : 0)}
                </span>
              </div>
              <div className='track-download'>
                <FontAwesomeIcon
                  icon={faDownload}
                  onClick={() => FileDownload(track.file_url, track.title)}
                />
              </div>
              <div className='track-download'>
                <FontAwesomeIcon
                  icon={faFacebook}
                  onClick={() =>
                    window.open(
                      `https://www.facebook.com/sharer/sharer.php?u=${getSongLink(
                        track.id
                      )}`,
                      '_blank'
                    )
                  }
                />
                <FontAwesomeIcon
                  icon={faTwitter}
                  onClick={() =>
                    window.open(
                      `https://twitter.com/intent/tweet?url=${getSongLink(
                        track.id
                      )}`,
                      '_blank'
                    )
                  }
                />
                <FontAwesomeIcon
                  icon={faEnvelope}
                  onClick={() =>
                    window.open(
                      `https://mail.google.com/mail/u/0/?view=cm&body=${getSongLink(
                        track.id
                      )}`,
                      '_blank'
                    )
                  }
                />
                <p>Share Now</p>
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
