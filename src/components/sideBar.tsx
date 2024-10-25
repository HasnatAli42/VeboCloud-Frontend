interface props {
  uploadMusic: boolean;
  goBack: () => void;
}
const Sidebar = ({ uploadMusic, goBack }: props) => (
  <div className='sidebar'>
    {uploadMusic ? (
      <ul>
        <li onClick={goBack}>Go Back</li>
      </ul>
    ) : (
      <>
        <h2>Discover</h2>
        <nav>
          <ul>
            <li>Listen Now</li>
            <li>Browse</li>
            <li>Radio</li>
          </ul>
        </nav>
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
    )}
  </div>
);
export default Sidebar;
