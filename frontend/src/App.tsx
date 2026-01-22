import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, useLocation } from 'react-router-dom';
import Cart from './components/Cart/Cart';
import OrderSuccessModal from './components/Order/OrderSuccessModal';
import AppRouter from './router/AppRouter';
import Footer from './screen/Footer';
import Header from './screen/Header';
import { useAppSelector } from './hooks/redux';
import { store } from './store/store';
import { theme } from './theme/theme';

const AppContent: React.FC = () => {
  const location = useLocation();
  const { isOpen } = useAppSelector(state => state.cart);
  const isAdminRoute = location.pathname === '/admin' || location.pathname?.startsWith('/admin/');

  return (
    <div className="App" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {!isAdminRoute && (
        <div style={{ pointerEvents: isOpen ? 'none' : 'auto' }}>
          <Header />
        </div>
      )}
      <main style={{ 
        flex: 1,
        pointerEvents: isOpen ? 'none' : 'auto',
        userSelect: isOpen ? 'none' : 'auto'
      }}>
        <AppRouter />
      </main>
      {!isAdminRoute && (
        <div style={{ pointerEvents: isOpen ? 'none' : 'auto' }}>
          <Footer />
        </div>
      )}
      <Cart />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <OrderSuccessModal />
        <BrowserRouter basename="/web-project">
          <AppContent />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
