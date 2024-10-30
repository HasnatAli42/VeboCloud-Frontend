import React, { useState } from 'react';
import MusicPlayer from './musicPlayer';
import MusicCard from './musicCard';
import Sidebar from './sideBar';
import { useNavigate } from 'react-router-dom';
import { useGetSongs } from '../api/api';

const Dashboard: React.FC = () => {
  return (
    <div className='dashboard'>
      <MainContent />
    </div>
  );
};

const MainContent: React.FC = () => {
  const navigate = useNavigate();
  const [playingAudio, setPlayingAudio] = useState<string | null>(null);

  const { data, isLoading } = useGetSongs();

  const handleCardClick = (audioSrc: string) => {
    setPlayingAudio(null);
    setTimeout(() => {
      setPlayingAudio(audioSrc);
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
                      imgSrc={
                        song.image ||
                        'https://png.pngtree.com/thumb_back/fh260/background/20230612/pngtree-pair-of-headphones-on-the-water-at-nighttime-image_2931863.jpg'
                      }
                      audioSrc={song.file}
                      onCardClick={handleCardClick}
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
                      imgSrc={
                        song.image ||
                        'https://png.pngtree.com/thumb_back/fh260/background/20230612/pngtree-pair-of-headphones-on-the-water-at-nighttime-image_2931863.jpg'
                      }
                      audioSrc={song.file}
                      onCardClick={handleCardClick}
                      smallCard
                    />
                  ))}
                </div>
              </section>
            </>
          </>
        )}
      </div>
      {playingAudio && <MusicPlayer audioSrc={playingAudio} />}{' '}
    </>
  );
};

export default Dashboard;
