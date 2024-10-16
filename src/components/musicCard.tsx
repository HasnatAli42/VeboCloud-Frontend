import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faHeart } from '@fortawesome/free-solid-svg-icons';

interface CardProps {
  id: string;
  title: string;
  author: string;
  imgSrc: string;
  audioSrc: string;
  smallCard?: boolean;
  onCardClick: (audioSrc: string) => void;
}

const MusicCard: React.FC<CardProps> = ({
  id,
  title,
  author,
  imgSrc,
  audioSrc,
  smallCard,
  onCardClick,
}) => {
  const [liked, setLiked] = useState<boolean>(false);

  useEffect(() => {
    const storedLiked = localStorage.getItem(`liked-${id}`);
    if (storedLiked === 'true') {
      setLiked(true);
    }
  }, [id]);

  const toggleLike = () => {
    const newLikedState = !liked;
    setLiked(newLikedState);
    localStorage.setItem(`liked-${id}`, newLikedState.toString());
  };

  return (
    <div className={`card ${smallCard ? 'smallCard' : ''}`}>
      <img src={imgSrc} alt={title} />
      <FontAwesomeIcon
        onClick={() => onCardClick(audioSrc)} 
        icon={faPlay}
        className='play-btn'
      />
      <FontAwesomeIcon
        icon={faHeart}
        className={`like-btn ${liked ? 'liked' : ''}`}
        onClick={toggleLike}
      />
      <div className='card-title'>{title}</div>
      <p>{author}</p>
    </div>
  );
};

export default MusicCard;
