import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import EditCategoryDialog from './EditCategoryDialog';
import { theme } from '../../theme/theme';

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

const mockCategory = {
  id: 1,
  name: 'Test Category',
  image: 'test.jpg',
  categoryKey: 'test-category',
};

const mockOnClose = jest.fn();
const mockOnSave = jest.fn();

describe('EditCategoryDialog', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders nothing when closed', () => {
    const { container } = renderWithTheme(
      <EditCategoryDialog
        category={mockCategory}
        open={false}
        onClose={mockOnClose}
        onSave={mockOnSave}
      />
    );
    expect(container.querySelector('.MuiDialog-root')).not.toBeInTheDocument();
  });

  it('renders when open', () => {
    renderWithTheme(
      <EditCategoryDialog
        category={mockCategory}
        open={true}
        onClose={mockOnClose}
        onSave={mockOnSave}
      />
    );
    expect(screen.getByText('Редактировать категорию')).toBeInTheDocument();
  });

  it('displays category name in input', () => {
    renderWithTheme(
      <EditCategoryDialog
        category={mockCategory}
        open={true}
        onClose={mockOnClose}
        onSave={mockOnSave}
      />
    );
    expect(screen.getByDisplayValue('Test Category')).toBeInTheDocument();
  });

  it('calls onClose when cancel button clicked', () => {
    renderWithTheme(
      <EditCategoryDialog
        category={mockCategory}
        open={true}
        onClose={mockOnClose}
        onSave={mockOnSave}
      />
    );
    fireEvent.click(screen.getByText('Отмена'));
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('calls onSave when save button clicked', () => {
    renderWithTheme(
      <EditCategoryDialog
        category={mockCategory}
        open={true}
        onClose={mockOnClose}
        onSave={mockOnSave}
      />
    );
    fireEvent.click(screen.getByText('Сохранить'));
    expect(mockOnSave).toHaveBeenCalled();
  });
});
