// App.tsx
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, useLocation } from 'react-router-dom';
import OrderSuccessModal from './components/Order/OrderSuccessModal';
import AppRouter from './router/AppRouter';
import Footer from './screen/Footer';
import Header from './screen/Header';
import { store } from './store/store';
import { theme } from './theme/theme';

const AppContent: React.FC = () => {
  const location = useLocation();
  // В HashRouter pathname должен работать правильно
  const isAdminRoute = location.pathname === '/admin' || location.pathname?.startsWith('/admin/');

  return (
    <div className="App" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {!isAdminRoute && <Header />}
      <main style={{ flex: 1 }}>
        <AppRouter />
      </main>
      {!isAdminRoute && <Footer />}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <OrderSuccessModal />
        <BrowserRouter basename={import.meta.env.BASE_URL}>
          <AppContent />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
};

export default App;