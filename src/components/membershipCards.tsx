import React from 'react';

const plans = [
  {
    title: 'Free Plan',
    price: 'Free',
    firstTimePrice: '$0',
    features: ['Song with watermark', 'No download'],
    buttonText: 'Get Free Plan',
    ribbonText: '',
    currentPlan: true,
  },
  {
    title: 'Monthly',
    price: '$9.99 per month',
    firstTimePrice: '$9.99/month',
    features: [
      '1 Premium account',
      'Unlimited downloads',
      'No watermark',
      'Cancel anytime',
    ],
    buttonText: 'Subscribe Now',
    ribbonText: '',
    currentPlan: false,
  },
  {
    title: '3-Month Plan',
    price: '1 month free, then $9.99/month',
    firstTimePrice: '$6.66/month',
    features: [
      '1 Premium account',
      'Save for the first 3 months',
      'Unlimited downloads',
      'No watermark',
      'Cancel anytime',
    ],
    buttonText: 'Get 3-Month Plan',
    ribbonText: '1 Month Free',
    currentPlan: false,
  },
];

const MembershipCards: React.FC = () => {
  return (
    <div className='main-content'>
      <div className='membership-container'>
        {plans.map((plan, index) => (
          <div key={index} className='membership-card'>
            {plan.ribbonText && <div className='ribbon'>{plan.ribbonText}</div>}
            <h2 className='plan-title'>{plan.title}</h2>
            <p className='plan-price'>{plan.price}</p>
            <p className='plan-first-price'>
              First Time Price: {plan.firstTimePrice}
            </p>
            <ul className='plan-features'>
              {plan.features.map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>
            <button
              className={`plan-button ${plan.currentPlan ? 'disabled' : ''}`}
              disabled={plan.currentPlan}
            >
              {plan.buttonText}
            </button>
            <p className='terms-link'>Terms apply.</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MembershipCards;
