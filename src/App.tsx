import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './css/App.css';
import './css/dashboard.css';
import './css/beats.css';
import './css/bootstrap.css';
import './css/cart.css';
import './css/comments.css';
import './css/custom.css';
import './css/jquery-contextmenu.css';
import './css/jqueryui.css';
import './css/loading.css';
import './css/reaction.css';
import './css/select2.css';
import './css/swiper.css';
import './css/theme.css';
import './i18n';
import Home from './pages/home';
import Navbar from './components/navbar';
import { Provider } from 'react-redux';
import LoginModal from './components/loginModal';
import { store } from './redux/store/store';
import SignUpModal from './components/signUpModal';
import DashboardPage from './pages/dashboard';
import { useAppSelector } from './hooks/storeHooks';

function AppWithRoutes() {
  const loggedInUser = useAppSelector((state) => state.auth.loggedInUser);
  return (
    <Router>
      <div>
        <Navbar />
        <LoginModal />
        <SignUpModal />
        <Routes>
          <Route
            path='/'
            element={loggedInUser?.email ? <DashboardPage /> : <Home />}
          />
        </Routes>
      </div>
    </Router>
  );
}

function App() {
  return (
    <Provider store={store}>
      <AppWithRoutes />
    </Provider>
  );
}

export default App;
