import React from 'react';
import FAQ from '../../screen/FaqScreen';
import HeroBanner from '../../screen/HeroBanner';
import ReviewsScreen from '../../screen/ReviewsScreen';
import HowItWorks from '../HowIt/HowIt';
import Map from '../Maps/MapSection';

const HomePage: React.FC = () => {
  return (
    <main>
      <HeroBanner />
      <HowItWorks />
      <Map />
      <ReviewsScreen />
      <FAQ />
    </main>
  );
};

export default HomePage;