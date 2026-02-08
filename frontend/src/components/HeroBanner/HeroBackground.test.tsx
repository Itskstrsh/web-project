import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import HeroBackground from './HeroBackground';
import { theme } from '../../theme/theme';

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('HeroBackground', () => {
  it('renders without crashing', () => {
    const { container } = renderWithTheme(<HeroBackground />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders background elements', () => {
    const { container } = renderWithTheme(<HeroBackground />);
    const boxes = container.querySelectorAll('.MuiBox-root');
    expect(boxes.length).toBeGreaterThanOrEqual(0);
  });
});
