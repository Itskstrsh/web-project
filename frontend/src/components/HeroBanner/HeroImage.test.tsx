import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import HeroImage from './HeroImage';
import { theme } from '../../theme/theme';

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('HeroImage', () => {
  it('renders without crashing', () => {
    const { container } = renderWithTheme(<HeroImage />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders image element', () => {
    const { container } = renderWithTheme(<HeroImage />);
    const img = container.querySelector('img');
    expect(img).toBeInTheDocument();
  });

  it('has correct alt text', () => {
    const { container } = renderWithTheme(<HeroImage />);
    const img = container.querySelector('img');
    expect(img).toHaveAttribute('alt', 'Котик с едой');
  });
});
