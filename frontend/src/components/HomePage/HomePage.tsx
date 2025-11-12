// pages/HomePage.tsx
import React from 'react';
import HeroBanner from '../HeroBanner/HeroBanner';
import HowItWorks from '../HowIt/HowIt';
import Map from '../Maps/MapSection';

const HomePage: React.FC = () => {
  return (
    <main>
      <HeroBanner />
      <HowItWorks />
      <Map/>
    </main>
  );
};

export default HomePage;