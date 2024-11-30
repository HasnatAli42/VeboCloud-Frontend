import MembershipCards from '../components/membershipCards';
import Sidebar from '../components/sideBar';
const MembershipPage = () => {
  return (
    <div className='dashboard'>
      <Sidebar />
      <MembershipCards />
    </div>
  );
};

export default MembershipPage;
