import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../hooks/storeHooks';
import {
  handleSetLoginModalOpen,
  handleSetSignUpModalOpen,
  handleSetUserAndLogin,
} from '../redux/actions/auth';
import { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { environment } from '../environment/environment';
import { setLoginModalMessage } from '../redux/slices/authSlice';
import { useGoogleLogin } from '@react-oauth/google';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';

const LoginModal = () => {
  const responseFacebook = (response: any) => {
    console.log(response);
  };
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const response = await axios.post(
        environment.VITE_BACKEND_URL + '/social-login/',
        {
          provider: 'google',
          access_token: tokenResponse.access_token,
        }
      );
    },
    onError: () => {
      console.log('Login Failed');
    },
  });

  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const defaultMessage = useAppSelector(
    (state) => state.auth.loginModalMessage
  );
  const isLoginModalOpen = useAppSelector((state) => state.auth.loginModalOpen);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const config = {
    settings: {
      social_login: true,
      facebook_login: true,
      google_login: true,
      twitter_login: false,
      apple_login: false,
    },
  };
  const { t } = useTranslation();
  const handleLogin = async () => {
    if (!formData.email || !formData.password) {
      setError('Please fill in the required fields');
      return;
    }
    setError('');
    setLoading(true);
    try {
      dispatch(setLoginModalMessage(''));
      const response = await axios.post(
        environment.VITE_BACKEND_URL + '/login/',
        {
          ...formData,
        }
      );
      if (response.data?.data) {
        setLoading(false);
        const {
          first_name,
          last_name,
          refresh_token,
          access_token,
          image,
          email,
          id,
        } = response.data.data as {
          first_name: string;
          last_name: string;
          refresh_token: string;
          access_token: string;
          image: string;
          email: string;
          id: string;
        };

        dispatch(
          handleSetUserAndLogin({
            first_name,
            last_name,
            refresh_token,
            access_token,
            image,
            email,
            id,
          })
        );
        setFormData({ email: '', password: '' });
      }
    } catch (error) {
      setLoading(false);
      const errorObject = (error as unknown as AxiosError)?.response?.data as {
        message: string;
      };
      if (errorObject.message.includes(':')) {
        setError(errorObject.message.split(':')?.[1]);
      } else {
        setError(errorObject.message);
      }
    }
  };
  return isLoginModalOpen ? (
    <>
      <div id='lightbox-overlay'></div>
      <div id={'lightbox-outer'}>
        <div className='lightbox lightbox-login '>
          <a
            className='lightbox-close close'
            onClick={() => dispatch(handleSetLoginModalOpen(false))}
          >
            <svg
              className='icon'
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
            >
              <path d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z' />
              <path d='M0 0h24v24H0z' fill='none' />
            </svg>
          </a>
          <div className='lbcontainer'>
            <div className='lightbox-header'>
              <h2 className='title'>{t('SIGN_IN')}</h2>
            </div>
            <div className='lightbox-content'>
              <div className='lightbox-content-block'>
                <div className='lb-nav-outer'>
                  <div className='lb-nav-container no-center'>
                    <div className='row'>
                      {config.settings.facebook_login && (
                        <div className='col'>
                          <FacebookLogin
                            appId='1272675010833381'
                            callback={responseFacebook}
                            fields='public_profile,email'
                            render={(renderProps) => (
                              <a
                                onClick={renderProps.onClick}
                                className='lb-facebook-login btn share-btn third-party facebook'
                                data-action='social-login'
                                data-service='facebook'
                              >
                                <svg
                                  className='icon'
                                  width='24'
                                  height='24'
                                  xmlns='http://www.w3.org/2000/svg'
                                  viewBox='0 0 512 512'
                                >
                                  <path d='M448,0H64C28.704,0,0,28.704,0,64v384c0,35.296,28.704,64,64,64h192V336h-64v-80h64v-64c0-53.024,42.976-96,96-96h64v80h-32c-17.664,0-32-1.664-32,16v64h80l-32,80h-48v176h96c35.296,0,64-28.704,64-64V64C512,28.704,483.296,0,448,0z'></path>
                                </svg>
                                <span
                                  className='text desktop'
                                  data-translate-text='SIGN_IN_FACEBOOK'
                                >
                                  {t('SIGN_IN_FACEBOOK')}
                                </span>
                                <span
                                  className='text mobile'
                                  data-translate-text='FACEBOOK'
                                >
                                  {t('FACEBOOK')}
                                </span>
                              </a>
                            )}
                          />
                        </div>
                      )}
                      {config.settings.google_login && (
                        <div className='col'>
                          <a
                            onClick={() => googleLogin()}
                            className='lb-google-login btn share-btn third-party google'
                            data-action='social-login'
                            data-service='google'
                          >
                            <svg
                              className='icon icon-google-plus-white-active'
                              xmlns='http://www.w3.org/2000/svg'
                              width='24'
                              height='24'
                              viewBox='0 0 24 24'
                              fill='#fff'
                            >
                              <path d='M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-10.333 16.667c-2.581 0-4.667-2.087-4.667-4.667s2.086-4.667 4.667-4.667c1.26 0 2.313.46 3.127 1.22l-1.267 1.22c-.347-.333-.954-.72-1.86-.72-1.593 0-2.893 1.32-2.893 2.947s1.3 2.947 2.893 2.947c1.847 0 2.54-1.327 2.647-2.013h-2.647v-1.6h4.406c.041.233.074.467.074.773-.001 2.666-1.787 4.56-4.48 4.56zm11.333-4h-2v2h-1.334v-2h-2v-1.333h2v-2h1.334v2h2v1.333z'></path>
                            </svg>
                            <span
                              className='text desktop'
                              data-translate-text='SIGN_IN_GOOGLE'
                            >
                              {t('SIGN_IN_GOOGLE')}
                            </span>
                            <span
                              className='text mobile'
                              data-translate-text='GOOGLE'
                            >
                              {t('GOOGLE')}
                            </span>
                          </a>
                        </div>
                      )}
                      {config.settings.twitter_login && (
                        <div className='col'>
                          <a
                            className='lb-twitter-login btn share-btn third-party twitter'
                            data-action='social-login'
                            data-service='twitter'
                          >
                            <svg
                              className='icon icon-twitter-white-active'
                              width='24'
                              height='24'
                              xmlns='http://www.w3.org/2000/svg'
                              viewBox='0 0 510 510'
                            >
                              <path d='M459,0H51C22.95,0,0,22.95,0,51v408c0,28.05,22.95,51,51,51h408c28.05,0,51-22.95,51-51V51C510,22.95,487.05,0,459,0z M400.35,186.15c-2.55,117.3-76.5,198.9-188.7,204C165.75,392.7,132.6,377.4,102,359.55c33.15,5.101,76.5-7.649,99.45-28.05c-33.15-2.55-53.55-20.4-63.75-48.45c10.2,2.55,20.4,0,28.05,0c-30.6-10.2-51-28.05-53.55-68.85c7.65,5.1,17.85,7.65,28.05,7.65c-22.95-12.75-38.25-61.2-20.4-91.8c33.15,35.7,73.95,66.3,140.25,71.4c-17.85-71.4,79.051-109.65,117.301-61.2c17.85-2.55,30.6-10.2,43.35-15.3c-5.1,17.85-15.3,28.05-28.05,38.25c12.75-2.55,25.5-5.1,35.7-10.2C425.85,165.75,413.1,175.95,400.35,186.15z'></path>
                            </svg>
                            <span
                              className='text desktop'
                              data-translate-text='SIGN_IN_TWITTER'
                            >
                              {t('SIGN_IN_TWITTER')}
                            </span>
                            <span
                              className='text mobile'
                              data-translate-text='TWITTER'
                            >
                              {t('TWITTER')}
                            </span>
                          </a>
                        </div>
                      )}
                      {config.settings.apple_login && (
                        <div className='col'>
                          <a
                            className='lb-apple-login btn share-btn third-party apple'
                            data-action='social-login'
                            data-service='apple'
                          >
                            <svg
                              className='icon icon-apple-white-active'
                              xmlns='http://www.w3.org/2000/svg'
                              viewBox='0 0 512 512'
                              width='24'
                              height='24'
                            >
                              <path d='M185.255,512c-76.201-0.439-139.233-155.991-139.233-235.21c0-129.404,97.075-157.734,134.487-157.734   c16.86,0,34.863,6.621,50.742,12.48c11.104,4.087,22.588,8.306,28.975,8.306c3.823,0,12.832-3.589,20.786-6.738   c16.963-6.753,38.071-15.146,62.651-15.146c0.044,0,0.103,0,0.146,0c18.354,0,74.004,4.028,107.461,54.272l7.837,11.777   l-11.279,8.511c-16.113,12.158-45.513,34.336-45.513,78.267c0,52.031,33.296,72.041,49.292,81.665   c7.061,4.248,14.37,8.628,14.37,18.208c0,6.255-49.922,140.566-122.417,140.566c-17.739,0-30.278-5.332-41.338-10.034   c-11.191-4.761-20.845-8.862-36.797-8.862c-8.086,0-18.311,3.823-29.136,7.881C221.496,505.73,204.752,512,185.753,512H185.255z'></path>
                              <path d='M298.676,0c6.642,51.467-42.827,109.616-82.806,103.163C209.605,56.971,260.766-0.422,298.676,0z'></path>
                            </svg>
                            <span
                              className='text desktop'
                              data-translate-text='SIGN_IN_APPLE'
                            >
                              {t('SIGN_IN_APPLE')}
                            </span>
                            <span
                              className='text mobile'
                              data-translate-text='APPLE'
                            >
                              {t('APPLE')}
                            </span>
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              {error && <div className='lightbox-error error'>{error}</div>}
              <div id='lightbox-login-form-goes-here'>
                <div className='error hide'></div>
                <div className='positive hide'>
                  <div className='message'></div>
                </div>
                {defaultMessage && (
                  <div className='lightbox-success success'>
                    {defaultMessage}
                  </div>
                )}
                <form id='lightbox-login-form' className='vertical'>
                  <div className='row'>
                    <div className='control-group col-lg-6 col-12'>
                      <label
                        className='control-label'
                        htmlFor='email'
                        data-translate-text='FORM_EMAIL'
                      >
                        {t('FORM_EMAIL')}{' '}
                      </label>
                      <div className='controls'>
                        <input
                          value={formData.email}
                          className='login-text px-2'
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              email: e.target.value,
                            })
                          }
                          id='login-email'
                          name='email'
                          type='text'
                        />
                      </div>
                      {!loading && (
                        <a
                          onClick={() =>
                            dispatch(handleSetSignUpModalOpen(true))
                          }
                          className='open-signup small desktop'
                          data-translate-text='LB_SIGNUP_LOGIN_DONT_HAVE_ACCOUNT_SUB'
                        >
                          {t('LB_SIGNUP_LOGIN_DONT_HAVE_ACCOUNT_SUB')}{' '}
                        </a>
                      )}
                    </div>
                    <div className='control-group col-lg-6 col-12'>
                      <label
                        className='control-label'
                        htmlFor='password'
                        data-translate-text='FORM_PASSWORD'
                      >
                        {t('FORM_PASSWORD')}{' '}
                      </label>
                      <div className='controls'>
                        <input
                          value={formData.password}
                          className='login-text px-2'
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              password: e.target.value,
                            })
                          }
                          id='login-password'
                          name='password'
                          type='password'
                        />
                      </div>
                      {/* <a
                        className='forgot small'
                        data-translate-text='FORM_FORGOT_PASSWORD'
                      >
                        {t('FORM_FORGOT_PASSWORD')}{' '}
                      </a> */}
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className='lightbox-footer'>
              <div className='right'>
                <button
                  disabled={loading}
                  onClick={() => handleLogin()}
                  className='btn btn-primary submit'
                  data-translate-text='SIGN_IN'
                >
                  {loading ? 'Loading...' : t('SIGN_IN')}
                </button>
              </div>
              {!true && (
                <div id='lightbox-footer-left' className='left mobile'>
                  <button
                    className='btn btn-secondary open-signup'
                    data-translate-text='LB_SIGNUP_LOGIN_DONT_HAVE_ACCOUNT_SUB'
                  >
                    {t('LB_SIGNUP_LOGIN_DONT_HAVE_ACCOUNT_SUB')}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <></>
  );
};

export default LoginModal;
