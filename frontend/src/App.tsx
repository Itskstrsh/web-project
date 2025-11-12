// App.tsx
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import AppRouter from './router/AppRouter';
import Footer from './screen/Footer';
import Header from './screen/Header';
import { store } from './store/store';
import { theme } from './theme/theme';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <HashRouter>
          <div className="App" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Header />
            <main style={{ flex: 1 }}>
              <AppRouter />
            </main>
            <Footer />
          </div>
        </HashRouter>
      </ThemeProvider>
    </Provider>
  );
};

export default App;