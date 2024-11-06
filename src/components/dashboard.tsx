import React, { useState } from 'react';
import MusicPlayer from './musicPlayer';
import MusicCard from './musicCard';
import Sidebar from './sideBar';
import { useNavigate } from 'react-router-dom';
import { useGetSongs } from '../api/api';
import { defaultSongImage, song } from '../utils/constants';

const Dashboard: React.FC = () => {
  return (
    <div className='dashboard'>
      <MainContent />
    </div>
  );
};

const MainContent: React.FC = () => {
  const navigate = useNavigate();
  const [playingSong, setPlayingSong] = useState<song | null>(null);

  const { data, isLoading } = useGetSongs();

  const handleCardClick = (song: song) => {
    setPlayingSong(null);
    setTimeout(() => {
      setPlayingSong(song);
    }, 1000);
  };
  return (
    <>
      <Sidebar />
      <div className='main-content'>
        {isLoading ? (
          <>Loading...</>
        ) : (
          <>
            <div className='top-bar'>
              <div className='tabs'>
                <button>Music</button>
                <button>Podcasts</button>
                <button>Live</button>
              </div>

              <button className='add-music' onClick={() => navigate('/upload')}>
                + Add music
              </button>
            </div>
            <>
              <section>
                <h2>Listen Now</h2>
                <p>Top picks for you. Updated daily.</p>
                <div className='cards'>
                  {data?.map((song) => (
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
              <section>
                <h2>Made for You</h2>
                <p>Your personal playlists. Updated daily.</p>
                <div className='cards'>
                  {data?.map((song) => (
                    <MusicCard
                      key={song.id}
                      id={song.id}
                      title={song.title}
                      author={song.artist?.bio || ''}
                      imgSrc={song.image || defaultSongImage}
                      audioSrc={song.file}
                      onCardClick={() => handleCardClick(song)}
                      smallCard
                    />
                  ))}
                </div>
              </section>
            </>
          </>
        )}
      </div>
      {playingSong && (
        <MusicPlayer
          audioSrc={playingSong?.file}
          title={playingSong.title}
          image={playingSong.image || defaultSongImage}
        />
      )}{' '}
    </>
  );
};

export default Dashboard;
