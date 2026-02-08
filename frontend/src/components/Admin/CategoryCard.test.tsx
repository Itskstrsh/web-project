import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import CategoryCard from './CategoryCard';
import { theme } from '../../theme/theme';

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

const mockCategory = {
  id: 1,
  name: 'Test Category',
};

const mockOnClick = jest.fn();
const mockOnDelete = jest.fn();
const mockOnEdit = jest.fn();

describe('CategoryCard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    renderWithTheme(
      <CategoryCard
        category={mockCategory}
        isSelected={false}
        onClick={mockOnClick}
      />
    );
    expect(screen.getByText('Test Category')).toBeInTheDocument();
  });

  it('displays category name', () => {
    renderWithTheme(
      <CategoryCard
        category={mockCategory}
        isSelected={false}
        onClick={mockOnClick}
      />
    );
    expect(screen.getByText('Test Category')).toBeInTheDocument();
  });

  it('calls onClick when card clicked', () => {
    renderWithTheme(
      <CategoryCard
        category={mockCategory}
        isSelected={false}
        onClick={mockOnClick}
      />
    );
    fireEvent.click(screen.getByText('Test Category'));
    expect(mockOnClick).toHaveBeenCalled();
  });

  it('renders edit button when showEdit is true', () => {
    renderWithTheme(
      <CategoryCard
        category={mockCategory}
        isSelected={false}
        onClick={mockOnClick}
        onEdit={mockOnEdit}
        showEdit={true}
      />
    );
    const editButton = screen.getByTestId('EditIcon');
    expect(editButton).toBeInTheDocument();
  });

  it('renders delete button when showDelete is true', () => {
    renderWithTheme(
      <CategoryCard
        category={mockCategory}
        isSelected={false}
        onClick={mockOnClick}
        onDelete={mockOnDelete}
        showDelete={true}
      />
    );
    const deleteButton = screen.getByTestId('DeleteIcon');
    expect(deleteButton).toBeInTheDocument();
  });
});
