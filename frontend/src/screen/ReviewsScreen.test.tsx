import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import ReviewsScreen from './ReviewsScreen';
import { theme } from '../theme/theme';

// Mock reviews data
jest.mock('../data/reviewsData', () => ({
  reviewsData: [
    { id: '1', authorName: 'User 1', text: 'Review 1', rating: 5, date: '2024-01-01' },
    { id: '2', authorName: 'User 2', text: 'Review 2', rating: 4, date: '2024-01-02' },
    { id: '3', authorName: 'User 3', text: 'Review 3', rating: 5, date: '2024-01-03' },
  ],
}));

// Mock child components
jest.mock('../components/FAQ/FaqSection', () => ({
  SectionContainer: ({ children, id }: { children: React.ReactNode; id?: string }) => (
    <div data-testid="section-container" id={id}>{children}</div>
  ),
}));

jest.mock('../components/Reviews/ReviewsCarousel', () => ({
  __esModule: true,
  default: ({ reviews }: { reviews: any[] }) => (
    <div data-testid="reviews-carousel">{reviews.length} reviews</div>
  ),
}));

jest.mock('../components/Reviews/ReviewsNavigation', () => ({
  __esModule: true,
  default: ({ onPrev, onNext }: { onPrev: () => void; onNext: () => void }) => (
    <div data-testid="reviews-navigation">
      <button onClick={onPrev}>Prev</button>
      <button onClick={onNext}>Next</button>
    </div>
  ),
}));

jest.mock('../components/Reviews/ReviewsTitle', () => ({
  __esModule: true,
  default: () => <div data-testid="reviews-title">Reviews Title</div>,
}));

jest.mock('../components/Reviews/ViewAllButton', () => ({
  __esModule: true,
  default: () => <div data-testid="view-all-button">View All</div>,
}));

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('ReviewsScreen', () => {
  it('renders without crashing', () => {
    renderWithTheme(<ReviewsScreen />);
    expect(screen.getByTestId('section-container')).toBeInTheDocument();
  });

  it('displays reviews title', () => {
    renderWithTheme(<ReviewsScreen />);
    expect(screen.getByTestId('reviews-title')).toBeInTheDocument();
  });

  it('displays reviews carousel', () => {
    renderWithTheme(<ReviewsScreen />);
    expect(screen.getByTestId('reviews-carousel')).toBeInTheDocument();
  });

  it('displays view all button', () => {
    renderWithTheme(<ReviewsScreen />);
    expect(screen.getByTestId('view-all-button')).toBeInTheDocument();
  });

  it('has correct id attribute', () => {
    renderWithTheme(<ReviewsScreen />);
    expect(screen.getByTestId('section-container')).toHaveAttribute('id', 'reviews');
  });
});
