import { AllSongs } from '../components/dashboard';
import Sidebar from '../components/sideBar';
const SongsPage = () => {
  return (
    <div className='dashboard'>
      <Sidebar />
      <AllSongs />
    </div>
  );
};

export default SongsPage;
