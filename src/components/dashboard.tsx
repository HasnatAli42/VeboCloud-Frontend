import React, { useEffect, useState } from 'react';
import MusicPlayer from './musicPlayer';
import MusicCard from './musicCard';
import UploadMusic from '../pages/uploadMusic';
import Sidebar from './sideBar';
import axios from 'axios';
import { environment } from '../environment/environment';
interface song {
  id: number;
  title: string;
  artist?: {
    id: number;
    user: {
      id: number;
      email: string;
    };
    bio: string;
    profile_picture: string;
    social_media_links: string;
    verified: boolean;
  };
  album?: {
    id: number;
    title: string;
    release_date: string;
    cover_art: string;
  };
  genre?: {
    name: string;
    description: string;
  };
  upload_date: string;
  file: string;
  length: string;
}
const Dashboard: React.FC = () => {
  return (
    <div className='dashboard'>
      <MainContent />
    </div>
  );
};

const MainContent: React.FC = () => {
  const [uploadMusic, setUploadMusic] = useState(false);
  const [playingAudio, setPlayingAudio] = useState<string | null>(null);
  const [songs, setSongs] = useState<song[]>([]);
  useEffect(() => {
    axios.get(environment.VITE_BACKEND_URL + '/songs/').then((response) => {
      setSongs(response.data.data);
    });
  }, []);

  const handleCardClick = (audioSrc: string) => {
    setPlayingAudio(null);
    setTimeout(() => {
      setPlayingAudio(audioSrc);
    }, 1000);
  };
  return (
    <>
      <Sidebar uploadMusic={uploadMusic} goBack={() => setUploadMusic(false)} />
      <div className='main-content'>
        <div className='top-bar'>
          {!uploadMusic && (
            <div className='tabs'>
              <button>Music</button>
              <button>Podcasts</button>
              <button>Live</button>
            </div>
          )}
          {!uploadMusic && (
            <button className='add-music' onClick={() => setUploadMusic(true)}>
              + Add music
            </button>
          )}
        </div>
        {uploadMusic ? (
          <section>
            <UploadMusic />
          </section>
        ) : (
          <>
            <section>
              <h2>Listen Now</h2>
              <p>Top picks for you. Updated daily.</p>
              <div className='cards'>
                {songs.map((song) => (
                  <MusicCard
                    key={song.id}
                    id={song.id}
                    title={song.title}
                    author={song.artist?.bio || ''}
                    imgSrc={
                      song.artist?.profile_picture ||
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
                {songs.map((song) => (
                  <MusicCard
                    key={song.id}
                    id={song.id}
                    title={song.title}
                    author={song.artist?.bio || ''}
                    imgSrc={
                      song.artist?.profile_picture ||
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
        )}
      </div>
      {playingAudio && <MusicPlayer audioSrc={playingAudio} />}{' '}
    </>
  );
};

export default Dashboard;
