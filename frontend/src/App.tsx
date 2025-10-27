import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Header from './components/Header/Header';
import HeroBanner from './components/HeroBanner/HeroBanner';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-white">
        <Header />
        <main>
          <HeroBanner />
          {/* Здесь будут другие секции */}
        </main>
      </div>
    </Provider>
  );
};

export default App;