// pages/HomePage.tsx
import React from 'react';
import FAQ from '../../screens/faq-screen/FaqScreen.tsx';
import HeroBanner from '../HeroBanner/HeroBanner';
import HowItWorks from '../HowIt/HowIt';
import Map from '../Maps/MapSection';
const HomePage: React.FC = () => {
  return (
    <main>
      <HeroBanner />
      <HowItWorks />
      <Map/>
      <FAQ />
    </main>
  );
};

export default HomePage;