import React from 'react';
import Sidebar from '../components/sideBar';
import ArtistProfile from '../components/artistProfile';

const ArtistProfilePage: React.FC = () => {
  return (
    <div className='dashboard'>
      <Sidebar />
      <div className='main-content'>
        <section>
          <ArtistProfile />
        </section>
      </div>
    </div>
  );
};
export default ArtistProfilePage;
