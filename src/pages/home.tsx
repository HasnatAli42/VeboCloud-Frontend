import { useTranslation } from 'react-i18next';
import useAuth from '../hooks/useAuth';
import { Link } from 'react-router-dom';
import WhyUsSection from '../components/whyUsSection';
import JoinUsSection from '../components/joinUsSection';
import ClaimNowSection from '../components/claimNowSection';
import mainLanding from '../images/main-landing.png';
import { useAppDispatch } from '../hooks/storeHooks';
import { handleSetLoginModalOpen } from '../redux/actions/auth';

const LandingHero = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { user, isAuthenticated } = useAuth();

  // const isDefaultUserGroup =
  //   user?.group?.role_id ===
  //     Number(import.meta.env.REACT_APP_DEFAULT_USER_GROUP) || false;

    const isDefaultUserGroup = user || false;

  return (
    <div id='landing-hero' className='p-0'>
      <div className='claim-hero'>
        <div className='container claim-container'>
          <div className='row'>
            <div className='col'>
              <div className='vertical-align'>
                <p className='claim-subtitle text-uppercase'>{t('PREMIUM')}</p>
                <h1 className='claim-display-title'>{t('LANDING_TITLE')}</h1>
                {isAuthenticated ? (
                  isDefaultUserGroup ? (
                    <>
                      <p className='claim-h3 text-left text-white'>
                        {t('LANDING_DESC')}
                      </p>
                      <Link
                        to='/settings/subscription'
                        className='button-white orange w-button'
                      >
                        {t('LANDING_BUTTON_TEXT')}
                      </Link>
                    </>
                  ) : (
                    <>
                      <p className='claim-h3 text-left text-white'>
                        {t('LANDING_DISCOVER_DESC')}
                      </p>
                      <Link
                        to='/discover'
                        className='button-white orange w-button'
                      >
                        {t('LANDING_DISCOVER_BUTTON_TEXT')}
                      </Link>
                    </>
                  )
                ) : (
                  <>
                    <p className='claim-h3 text-left text-white'>
                      {t('LANDING_DESC')}
                    </p>
                    <a
                      onClick={() => dispatch(handleSetLoginModalOpen(true))}
                      className='button-white orange w-button claim-artist-access'
                    >
                      {t('LANDING_BUTTON_TEXT')}
                    </a>
                  </>
                )}
              </div>
            </div>
            <div className='claim-column-right col'>
              <img
                src={mainLanding}
                width='540'
                alt={t('LANDING_TITLE')}
                className='claim-landing-image'
              />
            </div>
          </div>
        </div>
      </div>

      <div className='container landing-text-section'>
        <p className='landing-section-title'>
          {t('LANDING_ENHANCING')}
          <br />
        </p>
        <div className='d-flex justify-content-between flex-lg-row flex-column'>
          <div className='media mb-lg-0 mb-5'>
            <div className='landing-media-icon mr-3'>
              <svg
                width='79.977'
                height='79.977'
                viewBox='0 0 79.977 79.977'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path d='M66.535,13.693H52.589V6.468c0-1.484-1.203-2.688-2.688-2.688H30.075c-1.485,0-2.688,1.204-2.688,2.688v7.225H13.441 C6.018,13.693,0,19.712,0,27.134v29.21l0.022-0.002c0.077,0.144,8.041,14.229,19.854,19.509l-0.154,0.345L60.4,75.593 c11.383-5.086,18.959-18.447,19.576-19.563V27.134C79.976,19.712,73.958,13.693,66.535,13.693z M47.213,13.693h-14.45V9.157 h14.449L47.213,13.693L47.213,13.693z' />
                <path d='M0,58.446v4.309c0,7.424,6.018,13.441,13.441,13.441h4.1C8.537,71.398,2.268,62.175,0,58.446z' />
                <path d='M62.242,76.196h4.293c7.423,0,13.44-6.018,13.44-13.441v-4.08C77.441,62.741,71.136,71.671,62.242,76.196z' />
              </svg>
            </div>
            <div className='media-body pr-3'>
              <div className='landing-heading-small'>
                {t('LANDING_ENHANCING_PARTNERS_TITLE')}
              </div>
              {t('LANDING_ENHANCING_PARTNERS_DESC')}
            </div>
          </div>
          <div className='media mb-lg-0 mb-5'>
            <div className='landing-media-icon mr-3'>
              <svg
                height='512'
                viewBox='0 0 512 512'
                width='512'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path d='m354.721 257.948h34.002v12h-34.002z' />
                <path d='m164.723 212.759h182.555a15.9 15.9 0 0 0 0-31.792h-182.555a15.9 15.9 0 0 0 0 31.792z' />
                <path d='m228.034 115.337v-95.089a85.243 85.243 0 0 0 -13 5.194v73.58a16.774 16.774 0 0 0 13 16.315z' />
                <path d='m344.721 102.345a85.826 85.826 0 0 0 -37.754-71.074v67.751a26.786 26.786 0 0 1 -26.755 26.755h-48.423a26.786 26.786 0 0 1 -26.755-26.755v-67.751a85.826 85.826 0 0 0 -37.754 71.074v68.622h177.441z' />
                <path d='m296.967 99.022v-73.58a85.243 85.243 0 0 0 -13-5.194v95.089a16.774 16.774 0 0 0 13-16.315z' />
                <path d='m273.967 17.854a85.85 85.85 0 0 0 -12.967-1.302v99.225h12.967z' />
                <path d='m251.348 442.208h9.3c86.058 0 156.071-70.013 156.071-156.07v-56.19a9 9 0 1 0 -18 0v56.19c0 76.132-61.939 138.07-138.071 138.07h-9.3c-76.132 0-138.071-61.938-138.071-138.07v-56.19a9 9 0 0 0 -18 0v56.19c0 86.062 70.013 156.07 156.071 156.07z' />
                <path d='m251 16.552a85.824 85.824 0 0 0 -12.966 1.3v97.923h12.966z' />
                <path d='m123.277 257.948h34.003v12h-34.003z' />
                <path d='m269.31 451.984q-4.3.222-8.658.224h-9.3q-4.356 0-8.657-.224v43.464h26.615z' />
                <path d='m253.127 377.468h5.747a85.944 85.944 0 0 0 85.847-85.847v-68.862h-177.441v68.862a85.944 85.944 0 0 0 85.847 85.847zm-72.248-133.148a5 5 0 0 1 10 0v8.063a5 5 0 0 1 -10 0zm0 26.031a5 5 0 0 1 10 0v22.149a58.715 58.715 0 0 0 58.649 58.65 5 5 0 0 1 0 10 68.817 68.817 0 0 1 -68.649-68.65v-22.149a5 5 0 0 1 5-5zm0 0a5 5 0 0 1 10 0v8.063a5 5 0 0 1 -10 0zm0 26.031a5 5 0 0 1 10 0v22.149a58.715 58.715 0 0 0 58.649 58.65 5 5 0 0 1 0 10 68.817 68.817 0 0 1 -68.649-68.65v-22.149a5 5 0 0 1 5-5z' />
              </svg>
            </div>
            <div className='media-body pr-3'>
              <div className='landing-heading-small'>
                {t('LANDING_ENHANCING_ARTISTS_TITLE')}
              </div>
              {t('LANDING_ENHANCING_ARTISTS_DESC')}
            </div>
          </div>
          <div className='media'>
            <div className='landing-media-icon mr-3'>
              <svg
                width='79.977'
                height='79.977'
                viewBox='0 0 79.977 79.977'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path d='M66.535,13.693H52.589V6.468c0-1.484-1.203-2.688-2.688-2.688H30.075c-1.485,0-2.688,1.204-2.688,2.688v7.225H13.441 C6.018,13.693,0,19.712,0,27.134v29.21l0.022-0.002c0.077,0.144,8.041,14.229,19.854,19.509l-0.154,0.345L60.4,75.593 c11.383-5.086,18.959-18.447,19.576-19.563V27.134C79.976,19.712,73.958,13.693,66.535,13.693z M47.213,13.693h-14.45V9.157 h14.449L47.213,13.693L47.213,13.693z' />
                <path d='M0,58.446v4.309c0,7.424,6.018,13.441,13.441,13.441h4.1C8.537,71.398,2.268,62.175,0,58.446z' />
                <path d='M62.242,76.196h4.293c7.423,0,13.44-6.018,13.44-13.441v-4.08C77.441,62.741,71.136,71.671,62.242,76.196z' />
              </svg>
            </div>
            <div className='media-body pr-3'>
              <div className='landing-heading-small'>
                {t('LANDING_ENHANCING_PUBLISHERS_TITLE')}
              </div>
              {t('LANDING_ENHANCING_PUBLISHERS_DESC')}
            </div>
          </div>
        </div>
      </div>

      <div className='pub-reach-section'>
        <div className='mxm-container-1440 container'>
          <div className='row'>
            <div className='d-flex flex-column description padd-top140 col-lg-6 col-12'>
              <h2 className='landing-heading-title white-text'>
                {t('REACH_AUDIENCE_TITLE')}
              </h2>
              <p className='h3-20---regular white-text'>
                {t('REACH_AUDIENCE_DESC')}
                <br />
              </p>
            </div>
            <div className='image-feature col-6 d-lg-block d-none'></div>
          </div>
        </div>
      </div>
      <WhyUsSection t={t} />
      <JoinUsSection t={t} />
      <ClaimNowSection t={t} />
    </div>
  );
};

export default LandingHero;
