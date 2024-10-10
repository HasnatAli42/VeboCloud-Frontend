import landingCollection from '../images/landing-collection.svg';
import landingPocket from '../images/landing-pocket.svg';
import landingForYou from '../images/landing-foryou.svg';
interface WhyUsSectionProps {
  t: (key: string) => string; 
}

const WhyUsSection = ({ t }: WhyUsSectionProps) => {
  return (
    <div className='va-section-footer secondary'>
      <div className='container claim-container'>
        <h2 className='claim-h2 mb-5' data-translate-text='WHY_US'>
          {t('WHY_US')}
        </h2>
        <div className='row'>
          <div className='card-info w-col col-lg-4 col-12'>
            <div className='position-relative d-flex justify-content-center mb-3'>
              <img src={landingCollection} alt='' className='card-image' />
            </div>
            <h3
              className='claim-feature-h3 text-center'
              data-translate-text='WHY_US_1_T'
            >
              {t('WHY_US_1_T')}
            </h3>
            <p
              className='claim-h3-regular text-secondary'
              data-translate-text='WHY_US_1_D'
            >
              {t('WHY_US_1_D')}
            </p>
          </div>
          <div className='card-info w-col col-lg-4 col-12'>
            <div className='position-relative d-flex justify-content-center mb-3'>
              <img src={landingPocket} alt='' className='card-image' />
            </div>
            <h3
              className='claim-feature-h3 text-center'
              data-translate-text='WHY_US_2_T'
            >
              {t('WHY_US_2_T')}
            </h3>
            <p
              className='claim-h3-regular text-secondary'
              data-translate-text='WHY_US_2_D'
            >
              {t('WHY_US_2_D')}
            </p>
          </div>
          <div className='card-info w-col col-lg-4 col-12'>
            <div className='position-relative d-flex justify-content-center mb-3'>
              <img src={landingForYou} alt='' className='card-image' />
            </div>
            <h3
              className='claim-feature-h3 text-center'
              data-translate-text='WHY_US_3_T'
            >
              {t('WHY_US_3_T')}
            </h3>
            <p
              className='claim-h3-regular text-secondary'
              data-translate-text='WHY_US_3_D'
            >
              {t('WHY_US_3_D')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyUsSection;
