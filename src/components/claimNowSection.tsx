import { useAppDispatch } from '../hooks/storeHooks';
import { handleSetLoginModalOpen } from '../redux/actions/auth';

interface ClaimNowSectionProps {
  t: (key: string) => string;
}

const ClaimNowSection = ({ t }: ClaimNowSectionProps) => {
  const dispatch = useAppDispatch();
  return (
    <div className='va-section-footer secondary blue'>
      <div className='container'>
        <h2
          className='claim-h2-white padding-bottom-40px text-white'
          data-translate-text='CLAIM_NOW_TEXT'
        >
          {t('CLAIM_NOW_TEXT')}
        </h2>
        <p
          className='claim-h3 text-white'
          data-translate-text='CLAIM_NOW_DESCRIPTION'
          dangerouslySetInnerHTML={{ __html: t('CLAIM_NOW_DESCRIPTION') }}
        ></p>
        <div className='d-flex justify-content-center'>
          <a
            onClick={() => dispatch(handleSetLoginModalOpen(true))}
            className='button-white w-button claim-artist-access'
            data-translate-text='CLAIM_NOW_BUTTON_TEXT'
          >
            {t('CLAIM_NOW_BUTTON_TEXT')}
          </a>
        </div>
      </div>
    </div>
  );
};
export default ClaimNowSection;
