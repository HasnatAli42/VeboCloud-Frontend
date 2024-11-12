import { MusicCategories } from '../components/dashboard';
import Sidebar from '../components/sideBar';
const MusicCategoriesPage = () => {
  return (
    <div className='dashboard'>
      <Sidebar />
      <MusicCategories />
    </div>
  );
};

export default MusicCategoriesPage;
