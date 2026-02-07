import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import HeroText from './HeroText';

jest.mock('./HeroFeatureItem', () => ({
  __esModule: true,
  default: ({ color, text }: { color: string; text: string }) => (
    <div data-testid="hero-feature-item" style={{ color }}>
      {text}
    </div>
  )
}));

describe('HeroText', () => {
  const renderWithRouter = (component: React.ReactElement) => {
    return render(<MemoryRouter>{component}</MemoryRouter>);
  };

  it('renders without crashing', () => {
    renderWithRouter(<HeroText />);
  });

  it('displays main heading', () => {
    renderWithRouter(<HeroText />);
    
    const heading = screen.getByText(/вкус меняет/i);
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveRole('heading');
  });

  it('displays gradient text for "НАСТРОЕНИЕ"', () => {
    renderWithRouter(<HeroText />);
    
    const gradientText = screen.getByText('НАСТРОЕНИЕ');
    expect(gradientText).toBeInTheDocument();
  });

  it('displays subtitle text', () => {
    renderWithRouter(<HeroText />);
    
    const subtitle = screen.getByText(/откройте для себя мир изысканных вкусов/i);
    expect(subtitle).toBeInTheDocument();
  });

  it('displays call-to-action button', () => {
    renderWithRouter(<HeroText />);
    
    const ctaButton = screen.getByText('АССОРТИМЕНТ');
    expect(ctaButton).toBeInTheDocument();
    expect(ctaButton.closest('a')).toHaveAttribute('href', '/assortment');
  });

  it('renders feature items', () => {
    renderWithRouter(<HeroText />);
    
    const featureItems = screen.getAllByTestId('hero-feature-item');
    expect(featureItems).toHaveLength(3);
    
    expect(screen.getByText('ПОЛУФАБРИКАТЫ')).toBeInTheDocument();
    expect(screen.getByText('ВЫПЕЧКА')).toBeInTheDocument();
    expect(screen.getByText('ГОТОВАЯ ЕДА')).toBeInTheDocument();
  });

  it('has correct heading structure', () => {
    renderWithRouter(<HeroText />);
    
    const mainHeading = screen.getByRole('heading', { level: 1 });
    expect(mainHeading).toBeInTheDocument();
    expect(mainHeading).toHaveTextContent(/вкус меняет/i);
  });

  it('applies correct styling to main heading', () => {
    renderWithRouter(<HeroText />);
    
    const mainHeading = screen.getByRole('heading', { level: 1 });
    expect(mainHeading).toHaveStyle({
      fontWeight: '900',
      color: '#4e0606ff'
    });
  });

  it('has button with correct styling', () => {
    renderWithRouter(<HeroText />);
    
    const button = screen.getByText('АССОРТИМЕНТ');
    expect(button).toHaveClass('MuiButton-contained');
  });

  it('renders features in grid layout', () => {
    renderWithRouter(<HeroText />);
    
    const featuresContainer = screen.getByText('ПОЛУФАБРИКАТЫ').closest('.MuiBox-root');
    expect(featuresContainer).toBeInTheDocument();
  });
});
