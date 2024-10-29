import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './css/App.css';
import './css/dashboard.css';
import './css/uploadMusic.css';
import './css/audioUpload.css';
import './css/bootstrap.css';
import './css/theme.css';
import './i18n';
import Home from './pages/home';
import Navbar from './components/navbar';
import { Provider } from 'react-redux';
import LoginModal from './components/loginModal';
import { store } from './redux/store/store';
import SignUpModal from './components/signUpModal';
import DashboardPage from './pages/dashboard';
import { useAppDispatch, useAppSelector } from './hooks/storeHooks';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useEffect } from 'react';
import { handleStatesOnRefresh } from './redux/actions/auth';
import { environment } from './environment/environment';
import UploadMusic from './pages/uploadMusic';

function AppWithRoutes() {
  const loggedInUser = useAppSelector((state) => state.auth.loggedInUser);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(handleStatesOnRefresh());
  }, []);
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
           <Route
            path='/upload'
            element={loggedInUser?.email ? <UploadMusic /> : <Home />}
          />
        </Routes>
      </div>
    </Router>
  );
}

function App() {
  return (
    <GoogleOAuthProvider clientId={environment.VITE_GOOGLE_CLIENT_ID}>
      <Provider store={store}>
        <AppWithRoutes />
      </Provider>
    </GoogleOAuthProvider>
  );
}

export default App;
