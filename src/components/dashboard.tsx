import React, { useEffect } from 'react';
import MusicCard from './musicCard';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  handleLikeSong,
  useGetGenres,
  useGetProfile,
  useGetSongs,
} from '../api/api';
import { defaultSongImage, genre, song } from '../utils/constants';
import { useAppDispatch, useAppSelector } from '../hooks/storeHooks';
import { handlePlaySong } from '../redux/actions/music';
import { useQueryClient } from 'react-query';
import queryKeys from '../utils/queryKeys';

interface pageType {
  type?: 'recent' | 'popular' | 'categories';
}
export const AllSongs: React.FC = () => {
  return <MainContent />;
};
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
  const userToken = useAppSelector(
    (state) => state.auth.loggedInUser?.access_token
  );
  const queryClient = useQueryClient();
  const search = useAppSelector((state) => state.music.searchTerm);
  const { data: profile } = useGetProfile();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { data: genres } = useGetGenres(search);
  const { data, isLoading } = useGetSongs(search);
  const genreName =
    location.search && location.search?.split('category=')?.[1]
      ? genres?.find(
          (g) => g.id === Number(location.search?.split('category=')?.[1])
        )?.name
      : '';

  const handleCardClick = (song: song) => {
    dispatch(handlePlaySong([], undefined));
    setTimeout(() => {
      dispatch(handlePlaySong(data || [], song));
    }, 1000);
  };
  useEffect(() => {
    if (location.search.includes('songid') && location.pathname === '/songs') {
      const songId = location.search.split('songid=')?.[1];
      if (songId && data) {
        const song = data.find((song) => song.id == Number(songId));
        if (song) {
          handleCardClick(song);
        }
        navigate('/songs');
      }
    }
  }, [location.pathname, location.search, data]);
  const requiredData =
    type === 'recent'
      ? [...(data || [])]?.sort(
          (a, b) =>
            new Date(b.upload_date).getTime() -
            new Date(a.upload_date).getTime()
        )
      : type === 'popular'
      ? [...(data || [])]?.sort((a, b) => b.like_count - a.like_count) || []
      : location.search && location.search?.split('category=')?.[1]
      ? data?.filter(
          (d) =>
            d.genre &&
            d.genre?.id == Number(location.search.split('category=')[1])
        )
      : data;
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
                ) : type === 'popular' ? (
                  <>
                    <h2>Most Popular</h2>
                    <p>Most Popular songs</p>
                  </>
                ) : (
                  <>
                    <h2>Songs {genreName ? '- ' + genreName : ''}</h2>
                  </>
                )}
                <div className='cards'>
                  {requiredData?.map((song) => (
                    <MusicCard
                      songLiked={profile?.liked_songs.includes(song.id)}
                      handleLikeSong={async () => {
                        await handleLikeSong(song.id);
                        queryClient.invalidateQueries(
                          queryKeys.getProfileKey(userToken)
                        );
                      }}
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
  const search = useAppSelector((state) => state.music.searchTerm);

  const { data, isLoading } = useGetGenres(search);

  const handleCardClick = (genre: genre) => {
    navigate(`/songs?category=${genre.id}`);
  };

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
                    <div
                      className='pointer'
                      key={genre.id}
                      onClick={() => handleCardClick(genre)}
                    >
                      {' '}
                      <MusicCard
                        id={genre.id}
                        title={genre.name}
                        imgSrc={genre.description}
                        author={''}
                        onCardClick={() => handleCardClick(genre)}
                      />
                    </div>
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
