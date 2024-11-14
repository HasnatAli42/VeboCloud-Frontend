import { useTranslation } from 'react-i18next';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/storeHooks';
import {
  handleLogout,
  handleSetLoginModalOpen,
  handleSetSignUpModalOpen,
} from '../redux/actions/auth';
import { useEffect } from 'react';
import axios from 'axios';
import { environment } from '../environment/environment';
import {
  setLoginModalMessage,
  setLoginModalOpen,
} from '../redux/slices/authSlice';
import MusicPlayer from './musicPlayer';

const Header = () => {
  const loggedInUser = useAppSelector((state) => state.auth.loggedInUser);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!loggedInUser) {
      navigate('/');
    }
  }, [loggedInUser]);

  useEffect(() => {
    if (location.search) {
      const uid = location.search.split('uid=')?.[1]?.split('&token=')?.[0];
      const token = location.search.split('uid=')?.[1]?.split('&token=')?.[1];
      if (uid && token) {
        axios
          .get(
            environment.VITE_BACKEND_URL +
              `/verify-email/activate/${uid}/${token}/`
          )
          .then((response) => {
            if (response.data.message === 'Email verification successful') {
              dispatch(setLoginModalOpen(true));
              dispatch(
                setLoginModalMessage('Email Verified, Please login to continue')
              );
            }
          })
          .catch(() => {
            dispatch(setLoginModalOpen(false));
            navigate('/');
          });
      }
    }
  }, []);
  const { t } = useTranslation();
  return (
    <>
      <MusicPlayer />{' '}
      <div id='header-container'>
        <div id='logo' className='desktop'>
          <Link to={'/'} className='logo-link'></Link>
        </div>
        <div id='header-search-container' className='desktop'>
          <form id='header-search'>
            <span className='prediction'></span>
            <input
              className='search'
              name='q'
              autoComplete='off'
              type='text'
              placeholder={t('SEARCH_FOR_MUSIC')}
            />
            <svg
              className='icon search'
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
            >
              <path d='M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z' />
              <path d='M0 0h24v24H0z' fill='none' />
            </svg>
          </form>
          <div className='tooltip suggest hide'>
            <div className='search-suggest-content-scroll'>
              <div id='search-suggest-content-container'></div>
            </div>
          </div>
        </div>

        <div id='header-user-assets' className='session desktop'>
          {loggedInUser === undefined ? (
            <>
              {' '}
              <a
                id='header-login-btn'
                onClick={() => dispatch(handleSetLoginModalOpen(true))}
                className='login'
                data-translate-text='SIGN_IN'
              >
                {t('SIGN_IN')}
              </a>
              <a
                id='header-signup-btn'
                className='create-account'
                data-translate-text='BECOME_A_MEMBER'
                onClick={() => dispatch(handleSetSignUpModalOpen(true))}
              >
                {t('BECOME_A_MEMBER')}
              </a>
            </>
          ) : (
            <a
              id='header-login-btn'
              onClick={() => dispatch(handleLogout())}
              className='login'
              data-translate-text='SIGN_OUT'
            >
              {t('SIGN_OUT')}
            </a>
          )}
          {loggedInUser && (
            <div id='header-account-group' className='user-asset'>
              <a id='profile-button' onClick={() => navigate('/editProfile')}>
                <img
                  src={loggedInUser.image}
                  className='profile-img'
                  width='16'
                  height='16'
                  alt='Profile'
                />
                <p className='title'>
                  {loggedInUser?.first_name + ' ' + loggedInUser?.last_name}
                </p>
              </a>
            </div>
          )}
          {/* <div id='account-buttons' className='user-asset'>
            <div className='btn-group no-border-left'>
              <a className='btn'>
                <svg
                  height='29'
                  viewBox='0 0 24 24'
                  width='15'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path d='M0 0h24v24H0z' fill='none' />
                  <path d='M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z' />
                </svg>
              </a>
           
          
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Header;
