import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { ThemeProvider } from '@mui/material/styles';
import AddCategoryForm from './AddCategoryForm';
import { theme } from '../../theme/theme';
import adminReducer from '../../store/slices/adminSlice';
import productReducer from '../../store/slices/productSlice';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

jest.mock('./ImageEditor', () => ({
  __esModule: true,
  default: () => <div data-testid="image-editor">ImageEditor</div>,
}));

const renderWithProviders = (component: React.ReactElement) => {
  const store = configureStore({
    reducer: {
      admin: adminReducer,
      products: productReducer,
    },
    preloadedState: {
      admin: {
        products: [],
        categories: [],
        searchQuery: '',
        selectedCategory: null,
        deletedBaseCategoryIds: [],
        loading: false,
        error: null,
      },
      products: {
        items: [],
        currentCategory: 'all',
        loading: false,
        error: null,
      },
    },
  });
  return render(
    <Provider store={store}>
      <MemoryRouter>
        <ThemeProvider theme={theme}>{component}</ThemeProvider>
      </MemoryRouter>
    </Provider>
  );
};

describe('AddCategoryForm', () => {
  it('renders form', () => {
    renderWithProviders(<AddCategoryForm />);
    expect(screen.getByLabelText(/название/i)).toBeInTheDocument();
  });

  it('renders image editor', () => {
    renderWithProviders(<AddCategoryForm />);
    expect(screen.getByTestId('image-editor')).toBeInTheDocument();
  });

  it('renders save button', () => {
    renderWithProviders(<AddCategoryForm />);
    expect(screen.getByText('Сохранить')).toBeInTheDocument();
  });
});
