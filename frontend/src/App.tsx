import React from 'react';
import { Provider } from 'react-redux';
import Header from './components/Header/Header';
import HeroBanner from './components/HeroBanner/HeroBanner';
import HowItWorks from './components/HowIt/HowIt';
import { store } from './store/store';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-white">
        <Header />
        <main>
          <HeroBanner />
          <HowItWorks/>
          {/* Здесь будут другие секции */}
        </main>
      </div>
    </Provider>
  );
};

export default App;