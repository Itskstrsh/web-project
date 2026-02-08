import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import HeroBanner from './HeroBanner';
import { theme } from '../theme/theme';

// Mock child components
jest.mock('../components/HeroBanner/HeroBackground', () => ({
  __esModule: true,
  default: () => <div data-testid="hero-background">Background</div>,
}));

jest.mock('../components/HeroBanner/HeroImage', () => ({
  __esModule: true,
  default: () => <div data-testid="hero-image">Image</div>,
}));

jest.mock('../components/HeroBanner/HeroText', () => ({
  __esModule: true,
  default: () => <div data-testid="hero-text">Text</div>,
}));

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('HeroBanner', () => {
  it('renders without crashing', () => {
    const { container } = renderWithTheme(<HeroBanner />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders hero background', () => {
    renderWithTheme(<HeroBanner />);
    expect(screen.getByTestId('hero-background')).toBeInTheDocument();
  });

  it('renders hero text', () => {
    renderWithTheme(<HeroBanner />);
    expect(screen.getByTestId('hero-text')).toBeInTheDocument();
  });

  it('renders hero image', () => {
    renderWithTheme(<HeroBanner />);
    expect(screen.getByTestId('hero-image')).toBeInTheDocument();
  });

  it('renders as section element', () => {
    const { container } = renderWithTheme(<HeroBanner />);
    expect(container.querySelector('section')).toBeInTheDocument();
  });
});
