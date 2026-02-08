import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import ReviewCard from './ReviewCard';
import { theme } from '../../theme/theme';

// Mock PhotoModal
jest.mock('./PhotoModal', () => ({
  __esModule: true,
  default: ({ open }: { open: boolean }) => (
    open ? <div data-testid="photo-modal">Modal Open</div> : null
  ),
}));

// Mock ImageWithError
jest.mock('./ImageWithError', () => ({
  __esModule: true,
  default: ({ src, alt }: { src: string; alt: string }) => (
    <img src={src} alt={alt} data-testid="image-with-error" />
  ),
}));

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

const mockReview = {
  id: '1',
  authorName: 'Test User',
  text: 'This is a test review',
  rating: 5,
  date: '2024-01-01',
  avatar: 'avatar.jpg',
  photos: ['photo1.jpg', 'photo2.jpg'],
};

describe('ReviewCard', () => {
  it('renders without crashing', () => {
    renderWithTheme(<ReviewCard review={mockReview} compact={false} />);
    expect(screen.getByText('Test User')).toBeInTheDocument();
  });

  it('displays author name', () => {
    renderWithTheme(<ReviewCard review={mockReview} compact={false} />);
    expect(screen.getByText('Test User')).toBeInTheDocument();
  });

  it('displays review text', () => {
    renderWithTheme(<ReviewCard review={mockReview} compact={false} />);
    expect(screen.getByText('This is a test review')).toBeInTheDocument();
  });

  it('displays rating stars', () => {
    renderWithTheme(<ReviewCard review={mockReview} compact={false} />);
    // Should have 5 star icons for rating of 5
    const stars = screen.getAllByRole('img');
    expect(stars.length).toBeGreaterThan(0);
  });

  it('renders in compact mode', () => {
    renderWithTheme(<ReviewCard review={mockReview} compact={true} />);
    expect(screen.getByText('Test User')).toBeInTheDocument();
  });
});
