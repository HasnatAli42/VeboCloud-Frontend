import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../hooks/storeHooks';
import {
  handleSetLoginModalOpen,
  handleSetSignUpModalOpen,
} from '../redux/actions/auth';

const Header = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  return (
    <>
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
          <div id='header-account-group' className='user-asset hide'>
            <a id='profile-button' className=''>
              <img
                className='profile-img'
                width='16'
                height='16'
                alt='Profile'
              />
              <span className='caret'></span>
            </a>
          </div>
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

          <div id='account-buttons' className='user-asset'>
            <div className='btn-group no-border-left'>
              <a id='settings-button' className='btn'>
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
              <Link
                id='upload-button'
                to={'/'}
                className='btn upload-music hide'
              >
                <svg
                  height='29'
                  viewBox='0 0 24 24'
                  width='15'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path d='M0 0h24v24H0z' fill='none' />
                  <path d='M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z' />
                </svg>
              </Link>
              <a id='notification-button' className='btn hide'>
                <span
                  id='header-notification-pill'
                  className='notification-pill hide'
                >
                  <span
                    id='header-notification-count'
                    className='notification-count'
                  >
                    0
                  </span>
                </span>
                <svg
                  height='29'
                  viewBox='0 0 24 24'
                  width='15'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path d='M0 0h24v24H0z' fill='none' />
                  <path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z' />
                </svg>
              </a>

              <a id='cart-button' data-action='show-cart' className='btn hide'>
                <span className='header-cart-notification-pill notification-pill hide'>
                  <span className='notification-count'>0</span>
                </span>
                <svg
                  height='29'
                  width='15'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 512 512'
                  xmlSpace='preserve'
                >
                  <path d='M307.286,277.558c-8.284,0-15.024,6.74-15.024,15.024c0,8.284,6.74,15.024,15.024,15.024c8.285,0,15.024-6.74,15.024-15.024C322.31,284.298,315.571,277.558,307.286,277.558z' />
                  <path d='M187.186,277.558c-8.284,0-15.024,6.74-15.024,15.024c0,8.284,6.74,15.024,15.024,15.024s15.024-6.74,15.024-15.024C202.21,284.298,195.471,277.558,187.186,277.558z' />
                  <path d='M471.667,64.671H96.793c-9.897,0-18.017,8.419-18.017,18.017c0,9.243,7.196,16.782,16.103,17.729l32.29,85.018l-14.942,22.64c-6.181,9.363-7.125,21.699-2.48,32.167c1.238,2.619,3.017,5.078,5.258,7.059l25.633,24.234c-2.203,3.066-3.574,6.898-3.574,11.103c0,8.284,6.74,15.024,15.024,15.024c8.284,0,15.024-6.74,15.024-15.024c0-4.201-1.371-7.986-3.574-11.052l13.053-20.017c1.859-2.825,2.783-6.238,2.772-9.704c-0.012-0.067-0.023-0.134-0.036-0.2l61.527,4.608c2.957,0.223,5.758,1.153,8.305,2.762c2.049,1.251,4.195,3.022,6.474,5.107c3.001,3.444,5.567,8.116,8.558,13.348c0.119,0.183,0.238,0.367,0.358,0.553c2.794,5.428,6.255,11.077,9.764,16.357c-0.007,0.003-0.017,0.008-0.027,0.013l-0.004,0.002c-1.164,1.174-2.49,2.305-3.934,3.354l-14.276,11.657l-0.036,0.026c-1.756,1.273-3.128,3.042-3.862,5.036l-7.027,18.93c-0.043,0.116-0.082,0.233-0.124,0.351c-2.635,9.663-11.826,15.693-21.45,15.693H40.171c-12.515,0-22.745-10.215-22.745-22.745S27.656,294.5,40.171,294.5h243.557c6.773,0,12.363-5.49,12.363-12.363s-5.49-12.363-12.363-12.363H40.171c-19.29,0-35.846,15.981-35.846,35.816c0,19.079,15.579,34.652,34.798,35.755c2.354,9.427,10.688,16.407,20.797,16.407h287.526c20.811,0,38.374-16.563,38.374-37.374c0-20.812-16.563-37.375-37.374-37.375H239.46c-6.773,0-12.363-5.49-12.363-12.363s5.49-12.363,12.363-12.363h243.835c12.515,0,22.745-10.215,22.745-22.745S484.182,64.671,471.667,64.671z' />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
