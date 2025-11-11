// App.tsx
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Header from '../src/components/Header/Header.tsx';
import AppRouter from './router/AppRouter';
import { store } from './store/store';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <Header />
          <AppRouter />
        </div>
      </BrowserRouter>
    </Provider>
  );
};

export default App;