import React from 'react';

interface Trend {
  id: string;
  title: string;
  imageUrl: string;
}

interface TrendingSectionProps {
  trends: Trend[];
}

const TrendingSection: React.FC<TrendingSectionProps> = ({ trends }) => {
  return (
    <section>
      <h2>Trending Now</h2>
      <div className='trending-container'>
        {trends.map((trend) => (
          <div key={trend.id} className='trend-item'>
            <img src={trend.imageUrl} alt={trend.title} />
            <h3>{trend.title}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrendingSection;
