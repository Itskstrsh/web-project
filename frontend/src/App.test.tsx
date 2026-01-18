import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import App from './App';
import { store } from './store/store';
import { theme } from './theme/theme';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

const MockedApp: React.FC = () => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </Provider>
);

describe('App', () => {
  it('renders without crashing', () => {
    render(<MockedApp />);
  });

  it('has correct app structure', () => {
    render(<MockedApp />);
    
    const appDiv = document.querySelector('.App');
    expect(appDiv).toBeInTheDocument();
  });
});
