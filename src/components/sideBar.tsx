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
              Categories
            </li>
            <li
              className={getActiveClass('/popular')}
              onClick={() => navigate('/popular')}
            >
              Popular
            </li>
            <li
              className={getActiveClass('/recent')}
              onClick={() => navigate('/recent')}
            >
              Recently Added
            </li>
          </ul>
        </nav>
        <h3>My Soundbytes</h3>
        <ul>
          <li
            className={getActiveClass('/upload')}
            onClick={() => navigate('/upload')}
          >
            Upload Music
          </li>
          <li>My Soundbytes</li>
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
