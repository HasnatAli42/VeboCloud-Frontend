import { RecentlyAdded } from '../components/dashboard';
import Sidebar from '../components/sideBar';
const RecentlyAddedPage = () => {
  return (
    <div className='dashboard'>
      <Sidebar />
      <RecentlyAdded />
    </div>
  );
};

export default RecentlyAddedPage;
