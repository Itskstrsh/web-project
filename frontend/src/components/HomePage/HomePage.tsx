// pages/HomePage.tsx
import React from 'react';
import HeroBanner from '../HeroBanner/HeroBanner';
import HowItWorks from '../HowIt/HowIt';

const HomePage: React.FC = () => {
  return (
    <main>
      <HeroBanner />
      <HowItWorks />
    </main>
  );
};

export default HomePage;