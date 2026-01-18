import React from 'react';
import { render, screen } from '@testing-library/react';
import HomePage from './HomePage';

jest.mock('../../screen/FaqScreen', () => ({
  __esModule: true,
  default: () => <div data-testid="faq-screen">FAQ Screen</div>
}));

jest.mock('../../screen/HeroBanner', () => ({
  __esModule: true,
  default: () => <div data-testid="hero-banner">Hero Banner</div>
}));

jest.mock('../HowIt/HowIt', () => ({
  __esModule: true,
  default: () => <div data-testid="how-it-works">How It Works</div>
}));

jest.mock('../Maps/MapSection', () => ({
  __esModule: true,
  default: () => <div data-testid="map-section">Map Section</div>
}));

describe('HomePage', () => {
  it('renders without crashing', () => {
    render(<HomePage />);
  });

  it('renders all main sections', () => {
    render(<HomePage />);
    
    expect(screen.getByTestId('hero-banner')).toBeInTheDocument();
    expect(screen.getByTestId('how-it-works')).toBeInTheDocument();
    expect(screen.getByTestId('map-section')).toBeInTheDocument();
    expect(screen.getByTestId('faq-screen')).toBeInTheDocument();
  });

  it('has correct structure with main element', () => {
    render(<HomePage />);
    
    const mainElement = screen.getByRole('main');
    expect(mainElement).toBeInTheDocument();
  });

  it('renders sections in correct order', () => {
    render(<HomePage />);
    
    const mainElement = screen.getByRole('main');
    const children = mainElement.children;
    
    expect(children[0]).toHaveAttribute('data-testid', 'hero-banner');
    expect(children[1]).toHaveAttribute('data-testid', 'how-it-works');
    expect(children[2]).toHaveAttribute('data-testid', 'map-section');
    expect(children[3]).toHaveAttribute('data-testid', 'faq-screen');
  });
});
