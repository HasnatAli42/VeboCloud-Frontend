import { MostPopular } from '../components/dashboard';
import Sidebar from '../components/sideBar';
const MostPopularPage = () => {
  return (
    <div className='dashboard'>
      <Sidebar />
      <MostPopular />
    </div>
  );
};

export default MostPopularPage;
