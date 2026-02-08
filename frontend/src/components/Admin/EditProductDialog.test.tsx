import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { ThemeProvider } from '@mui/material/styles';
import EditProductDialog from './EditProductDialog';
import { theme } from '../../theme/theme';
import adminReducer from '../../store/slices/adminSlice';

const renderWithProviders = (component: React.ReactElement) => {
  const store = configureStore({
    reducer: { admin: adminReducer },
    preloadedState: {
      admin: {
        products: [],
        categories: [
          { id: 1, name: 'Category 1', categoryKey: 'cat1' },
          { id: 2, name: 'Category 2', categoryKey: 'cat2' },
        ],
        searchQuery: '',
        selectedCategory: null,
        deletedBaseCategoryIds: [],
        loading: false,
        error: null,
      },
    },
  });
  return render(
    <Provider store={store}>
      <ThemeProvider theme={theme}>{component}</ThemeProvider>
    </Provider>
  );
};

const mockProduct = {
  id: '1',
  name: 'Test Product',
  price: 100,
  quantity: 5,
  description: 'Test Description',
  category: 'test',
  weight: '500g',
  image: 'test.jpg',
};

const mockOnClose = jest.fn();
const mockOnSave = jest.fn();

describe('EditProductDialog', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders nothing when closed', () => {
    const { container } = renderWithProviders(
      <EditProductDialog
        product={mockProduct}
        open={false}
        onClose={mockOnClose}
        onSave={mockOnSave}
      />
    );
    expect(container.querySelector('.MuiDialog-root')).not.toBeInTheDocument();
  });

  it('renders when open', () => {
    renderWithProviders(
      <EditProductDialog
        product={mockProduct}
        open={true}
        onClose={mockOnClose}
        onSave={mockOnSave}
      />
    );
    expect(screen.getByText('Редактировать товар')).toBeInTheDocument();
  });

  it('displays product name in input', () => {
    renderWithProviders(
      <EditProductDialog
        product={mockProduct}
        open={true}
        onClose={mockOnClose}
        onSave={mockOnSave}
      />
    );
    expect(screen.getByDisplayValue('Test Product')).toBeInTheDocument();
  });

  it('calls onClose when cancel button clicked', () => {
    renderWithProviders(
      <EditProductDialog
        product={mockProduct}
        open={true}
        onClose={mockOnClose}
        onSave={mockOnSave}
      />
    );
    fireEvent.click(screen.getByText('Отмена'));
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('calls onSave when save button clicked', () => {
    renderWithProviders(
      <EditProductDialog
        product={mockProduct}
        open={true}
        onClose={mockOnClose}
        onSave={mockOnSave}
      />
    );
    fireEvent.click(screen.getByText('Сохранить'));
    expect(mockOnSave).toHaveBeenCalled();
  });
});
