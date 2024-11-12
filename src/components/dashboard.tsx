import React from 'react';
import MusicCard from './musicCard';
import { useNavigate } from 'react-router-dom';
import { useGetGenres, useGetSongs } from '../api/api';
import { defaultSongImage, genre, song } from '../utils/constants';
import { useAppDispatch } from '../hooks/storeHooks';
import { handlePlaySong } from '../redux/actions/music';

interface pageType {
  type: 'recent' | 'popular' | 'categories';
}

export const RecentlyAdded: React.FC = () => {
  return <MainContent type={'recent'} />;
};
export const MostPopular: React.FC = () => {
  return <MainContent type={'popular'} />;
};
export const MusicCategories: React.FC = () => {
  return <Categories />;
};
const MainContent = ({ type }: pageType) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { data, isLoading } = useGetSongs();

  const handleCardClick = (song: song) => {
    dispatch(handlePlaySong([], undefined));
    setTimeout(() => {
      dispatch(handlePlaySong(data || [], song));
    }, 1000);
  };

  const requiredData =
    type === 'recent'
      ? [...(data || [])]?.sort(
          (a, b) =>
            new Date(b.upload_date).getTime() -
            new Date(a.upload_date).getTime()
        )
      : [...(data || [])]?.sort(
          (a, b) =>
            new Date(a.upload_date).getTime() -
            new Date(b.upload_date).getTime()
        ) || [];

  return (
    <>
      <div className='main-content'>
        {isLoading ? (
          <>Loading...</>
        ) : (
          <>
            <div className='top-bar'>
              <div className='tabs'></div>
              <button className='add-music' onClick={() => navigate('/upload')}>
                + Add Soundbyte
              </button>
            </div>
            <>
              <section>
                {type === 'recent' ? (
                  <>
                    <h2>Recently Added</h2>
                    <p>Recently added songs</p>
                  </>
                ) : (
                  <>
                    <h2>Most Popular</h2>
                    <p>Most Popular songs</p>
                  </>
                )}
                <div className='cards'>
                  {requiredData?.map((song) => (
                    <MusicCard
                      key={song.id}
                      id={song.id}
                      title={song.title}
                      author={song.artist?.bio || ''}
                      imgSrc={song.image || defaultSongImage}
                      audioSrc={song.file}
                      onCardClick={() => handleCardClick(song)}
                    />
                  ))}
                </div>
              </section>
            </>
          </>
        )}
      </div>
    </>
  );
};
const Categories = () => {
  const navigate = useNavigate();

  const { data, isLoading } = useGetGenres();

  const handleCardClick = (genre: genre) => {};

  return (
    <>
      <div className='main-content'>
        {isLoading ? (
          <>Loading...</>
        ) : (
          <>
            <div className='top-bar'>
              <div className='tabs'></div>
              <button className='add-music' onClick={() => navigate('/upload')}>
                + Add Soundbyte
              </button>
            </div>
            <>
              <section>
                <h2>Music Categories</h2>
                <p>Select from categories below</p>
                <div className='cards'>
                  {data?.map((genre) => (
                    <MusicCard
                      key={genre.id}
                      id={genre.id}
                      title={genre.name}
                      author={''}
                      onCardClick={() => handleCardClick(genre)}
                    />
                  ))}
                </div>
              </section>
            </>
          </>
        )}
      </div>
    </>
  );
};
