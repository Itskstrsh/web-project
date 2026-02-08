import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import ReviewsCarousel from './ReviewsCarousel';
import { theme } from '../../theme/theme';

// Mock ReviewCard
jest.mock('./ReviewCard', () => ({
  __esModule: true,
  default: ({ review }: { review: any }) => (
    <div data-testid="review-card">{review.authorName}</div>
  ),
}));

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

const mockReviews = [
  { id: '1', authorName: 'User 1', text: 'Review 1', rating: 5, date: '2024-01-01' },
  { id: '2', authorName: 'User 2', text: 'Review 2', rating: 4, date: '2024-01-02' },
];

describe('ReviewsCarousel', () => {
  it('renders empty state when no reviews', () => {
    renderWithTheme(<ReviewsCarousel reviews={[]} currentIndex={0} />);
    expect(screen.getByText('Отзывов пока нет')).toBeInTheDocument();
  });

  it('renders review cards when reviews exist', () => {
    renderWithTheme(<ReviewsCarousel reviews={mockReviews} currentIndex={0} />);
    expect(screen.getAllByTestId('review-card')).toHaveLength(2);
  });

  it('displays correct review names', () => {
    renderWithTheme(<ReviewsCarousel reviews={mockReviews} currentIndex={0} />);
    expect(screen.getByText('User 1')).toBeInTheDocument();
    expect(screen.getByText('User 2')).toBeInTheDocument();
  });
});
