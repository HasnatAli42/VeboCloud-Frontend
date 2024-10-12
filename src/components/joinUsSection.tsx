import { useAppDispatch } from '../hooks/storeHooks';
import landingCommunity from '../images/landing-community.svg';
import { handleSetLoginModalOpen } from '../redux/actions/auth';
interface JoinUsSectionProps {
  t: (key: string) => string;
}

const JoinUsSection = ({ t }: JoinUsSectionProps) => {
  const dispatch = useAppDispatch();
  return (
    <div className='va-section'>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-6 col-12 d-flex justify-content-center align-items-center'>
            <img src={landingCommunity} alt='' className='card-image' />
          </div>
          <div className='col-lg-6 col-12'>
            <h2
              className='claim-h2-white padding-bottom-40px'
              data-translate-text='JOIN_US_TITLE'
            >
              {t('JOIN_US_TITLE')}
            </h2>
            <p className='claim-h3' data-translate-text='JOIN_US_DESCRIPTION'>
              {t('JOIN_US_DESCRIPTION')}
            </p>
            <div className='d-flex justify-content-center'>
              <a
                onClick={() => dispatch(handleSetLoginModalOpen(true))}
                className='button-white w-button claim-artist-access button-red'
                data-translate-text='JOIN_US_BUTTON_TEXT'
              >
                {t('JOIN_US_BUTTON_TEXT')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinUsSection;
