import React, { useState } from 'react';
import MusicPlayer from './musicPlayer';
import testAudio from '../assets/testAudio.mp3';
import MusicCard from './musicCard';
import UploadMusic from '../pages/uploadMusic';
import Sidebar from './sideBar';

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
  const handleCardClick = (audioSrc: string) => {
    setPlayingAudio(null);
    setTimeout(() => {
      setPlayingAudio(audioSrc);
    }, 1000);
  };
  const cardsData = [
    {
      id: '1',
      title: 'React Rendezvous',
      author: 'Ethan Byte',
      imgSrc:
        'https://ui.shadcn.com/_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1611348586804-61bf6c080437%3Fw%3D300%26dpr%3D2%26q%3D80&w=640&q=75',
    },
    {
      id: '2',
      title: 'Async Awakenings',
      author: 'Nina Netcode',
      imgSrc:
        'https://ui.shadcn.com/_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1468817814611-b7edf94b5d60%3Fw%3D300%26dpr%3D2%26q%3D80&w=640&q=75',
    },
    {
      id: '3',
      title: 'The Art of Reusability',
      author: 'Lena Logic',
      imgSrc:
        'https://ui.shadcn.com/_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1528143358888-6d3c7f67bd5d%3Fw%3D300%26dpr%3D2%26q%3D80&w=640&q=75',
    },
    {
      id: '4',
      title: 'Stateful Symphony',
      author: 'Beth Binary',
      imgSrc:
        'https://ui.shadcn.com/_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1490300472339-79e4adc6be4a%3Fw%3D300%26dpr%3D2%26q%3D80&w=640&q=75',
    },
  ];

  const smallCardsData = [
    {
      id: '5',
      title: 'Thinking Components',
      author: 'Lena Logic',
      imgSrc:
        'https://ui.shadcn.com/_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1490300472339-79e4adc6be4a%3Fw%3D300%26dpr%3D2%26q%3D80&w=640&q=75',
    },
    {
      id: '6',
      title: 'Functional Fury',
      author: 'Beth Binary',
      imgSrc:
        'https://ui.shadcn.com/_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1528143358888-6d3c7f67bd5d%3Fw%3D300%26dpr%3D2%26q%3D80&w=640&q=75',
    },
    {
      id: '7',
      title: 'React Rendezvous',
      author: 'Ethan Byte',
      imgSrc:
        'https://ui.shadcn.com/_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1468817814611-b7edf94b5d60%3Fw%3D300%26dpr%3D2%26q%3D80&w=640&q=75',
    },
    {
      id: '8',
      title: 'Stateful Symphony',
      author: 'Beth Binary',
      imgSrc:
        'https://ui.shadcn.com/_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1611348586804-61bf6c080437%3Fw%3D300%26dpr%3D2%26q%3D80&w=640&q=75',
    },
    {
      id: '9',
      title: 'Async Awakenings',
      author: 'Nina Netcode',
      imgSrc:
        'https://ui.shadcn.com/_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1611348586804-61bf6c080437%3Fw%3D300%26dpr%3D2%26q%3D80&w=640&q=75',
    },
    {
      id: '10',
      title: 'The Art of Reusability',
      author: 'Lena Logic',
      imgSrc:
        'https://ui.shadcn.com/_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1468817814611-b7edf94b5d60%3Fw%3D300%26dpr%3D2%26q%3D80&w=640&q=75',
    },
  ];

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
                {cardsData.map((card) => (
                  <MusicCard
                    key={card.id}
                    id={card.id}
                    title={card.title}
                    author={card.author}
                    imgSrc={card.imgSrc}
                    audioSrc={testAudio}
                    onCardClick={handleCardClick}
                  />
                ))}
              </div>
            </section>
            <section>
              <h2>Made for You</h2>
              <p>Your personal playlists. Updated daily.</p>
              <div className='cards'>
                {smallCardsData.map((card) => (
                  <MusicCard
                    key={card.id}
                    id={card.id}
                    smallCard
                    title={card.title}
                    author={card.author}
                    imgSrc={card.imgSrc}
                    audioSrc={testAudio}
                    onCardClick={handleCardClick}
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
