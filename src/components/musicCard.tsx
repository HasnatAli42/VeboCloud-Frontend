import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faHeart } from '@fortawesome/free-solid-svg-icons';
import { useAppSelector } from '../hooks/storeHooks';

interface CardProps {
  id: number;
  title: string;
  songLiked?: boolean;
  handleLikeSong?: () => void;
  author?: string;
  imgSrc?: string;
  audioSrc?: string;
  smallCard?: boolean;
  onCardClick: (audioSrc: string) => void;
}

const MusicCard: React.FC<CardProps> = ({
  id,
  title,
  songLiked,
  handleLikeSong,
  author,
  imgSrc,
  audioSrc,
  smallCard,
  onCardClick,
}) => {
  const [liked, setLiked] = useState<boolean>(false);
  const currentlyPlayingSong = useAppSelector(
    (state) => state.music.currentSong
  );
  useEffect(() => {
    const storedLiked = localStorage.getItem(`liked-${id}`);
    if (storedLiked === 'true') {
      setLiked(true);
    }
  }, [id]);

  const toggleLike = async () => {
    const liked = songLiked;
    const newLikedState = !liked;
    setLiked(newLikedState);
    if (handleLikeSong) {
      handleLikeSong();
    }
  };

  return (
    <div className={`card ${smallCard ? 'smallCard' : ''}`}>
      <img
        src={imgSrc}
        alt={title}
        className={`${
          audioSrc && currentlyPlayingSong?.file_url === audioSrc
            ? 'opacity80'
            : ''
        }`}
      />
      {audioSrc && (
        <>
          <FontAwesomeIcon
            onClick={() => onCardClick(audioSrc)}
            icon={
              currentlyPlayingSong?.file_url === audioSrc ? faPause : faPlay
            }
            className={`play-btn ${
              currentlyPlayingSong?.file_url === audioSrc ? 'opacity1' : ''
            }`}
          />
          <FontAwesomeIcon
            icon={faHeart}
            className={`like-btn ${songLiked || liked ? 'liked' : ''}`}
            onClick={toggleLike}
          />
        </>
      )}
      <div className='card-title'>{title}</div>
      <p>{author}</p>
    </div>
  );
};

export default MusicCard;
