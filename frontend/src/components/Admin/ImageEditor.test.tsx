import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import ImageEditor from './ImageEditor';
import { theme } from '../../theme/theme';

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

const mockOnImageChange = jest.fn();
const mockOnImageRemove = jest.fn();

describe('ImageEditor', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without image', () => {
    renderWithTheme(
      <ImageEditor
        image={null}
        onImageChange={mockOnImageChange}
        onImageRemove={mockOnImageRemove}
      />
    );
    expect(screen.getByText('Добавить картинку')).toBeInTheDocument();
  });

  it('renders with image', () => {
    renderWithTheme(
      <ImageEditor
        image="test.jpg"
        onImageChange={mockOnImageChange}
        onImageRemove={mockOnImageRemove}
      />
    );
    expect(screen.getByAltText('Preview')).toBeInTheDocument();
  });

  it('shows delete button when image exists', () => {
    renderWithTheme(
      <ImageEditor
        image="test.jpg"
        onImageChange={mockOnImageChange}
        onImageRemove={mockOnImageRemove}
      />
    );
    expect(screen.getByTestId('DeleteIcon')).toBeInTheDocument();
  });

  it('calls onImageRemove when delete button clicked', () => {
    renderWithTheme(
      <ImageEditor
        image="test.jpg"
        onImageChange={mockOnImageChange}
        onImageRemove={mockOnImageRemove}
      />
    );
    const deleteButton = screen.getByTestId('DeleteIcon').closest('button');
    if (deleteButton) {
      fireEvent.click(deleteButton);
    }
    expect(mockOnImageRemove).toHaveBeenCalled();
  });

  it('shows helper text when image exists', () => {
    renderWithTheme(
      <ImageEditor
        image="test.jpg"
        onImageChange={mockOnImageChange}
        onImageRemove={mockOnImageRemove}
      />
    );
    expect(screen.getByText(/Перетащите для перемещения/)).toBeInTheDocument();
  });
});
