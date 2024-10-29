import { useLocation, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const getActiveClass = (pathname: string) =>
    pathname === location.pathname ? 'active' : '';

  return (
    <div className='sidebar'>
      <>
        <h2>Discover</h2>
        <nav>
          <ul>
            <li className={getActiveClass('/')} onClick={() => navigate('/')}>
              Listen Now
            </li>
            <li>Browse</li>
            <li>Radio</li>
          </ul>
        </nav>
        <h3>Upload</h3>
        <ul>
          <li
            className={getActiveClass('/upload')}
            onClick={() => navigate('/upload')}
          >
            Upload Music
          </li>
        </ul>
        <h3>Library</h3>
        <ul>
          <li>Playlists</li>
          <li>Songs</li>
          <li>Made for You</li>
          <li>Artists</li>
          <li>Albums</li>
        </ul>
        <h3>Playlists</h3>
        <ul>
          <li>Recently Added</li>
          <li>Recently Played</li>
          <li>Top Songs</li>
          <li>Top Albums</li>
          <li>Top Artists</li>
          <li>Logic Discography</li>
          <li>Bedtime Beats</li>
        </ul>
      </>
    </div>
  );
};
export default Sidebar;
