import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import PhotoModal from './PhotoModal';
import { theme } from '../../theme/theme';

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

const mockPhotos = ['photo1.jpg', 'photo2.jpg', 'photo3.jpg'];

const mockOnClose = jest.fn();

describe('PhotoModal', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders nothing when photos array is empty', () => {
    const { container } = renderWithTheme(
      <PhotoModal photos={[]} open={true} onClose={mockOnClose} />
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders when open with photos', () => {
    renderWithTheme(
      <PhotoModal photos={mockPhotos} open={true} onClose={mockOnClose} />
    );
    expect(screen.getByAltText('Фото 1 из 3')).toBeInTheDocument();
  });

  it('displays correct photo counter', () => {
    renderWithTheme(
      <PhotoModal photos={mockPhotos} open={true} onClose={mockOnClose} />
    );
    expect(screen.getByText('1 / 3')).toBeInTheDocument();
  });

  it('calls onClose when close button clicked', () => {
    renderWithTheme(
      <PhotoModal photos={mockPhotos} open={true} onClose={mockOnClose} />
    );
    // Find close button by testid instead of role
    const closeButton = screen.getByTestId('CloseIcon').closest('button');
    if (closeButton) {
      fireEvent.click(closeButton);
    }
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('navigates to next photo', () => {
    renderWithTheme(
      <PhotoModal photos={mockPhotos} open={true} onClose={mockOnClose} />
    );
    const nextButton = screen.getByTestId('ChevronRightIcon').closest('button');
    if (nextButton) {
      fireEvent.click(nextButton);
    }
    expect(screen.getByAltText('Фото 2 из 3')).toBeInTheDocument();
  });

  it('navigates to previous photo', () => {
    renderWithTheme(
      <PhotoModal photos={mockPhotos} open={true} onClose={mockOnClose} initialIndex={1} />
    );
    const prevButton = screen.getByTestId('ChevronLeftIcon').closest('button');
    if (prevButton) {
      fireEvent.click(prevButton);
    }
    expect(screen.getByAltText('Фото 1 из 3')).toBeInTheDocument();
  });
});
