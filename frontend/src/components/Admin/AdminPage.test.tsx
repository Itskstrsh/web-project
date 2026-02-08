import { render, screen, fireEvent } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import AdminPage from './AdminPage';
import { fetchProducts } from '../../store/slices/productSlice';
import {
  setProducts,
  setSearchQuery,
  setSelectedCategory,
  deleteCategory,
  updateCategory,
} from '../../store/slices/adminSlice';

jest.mock('../../hooks/redux', () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

jest.mock('../../store/slices/productSlice', () => ({
  fetchProducts: jest.fn(),
}));

jest.mock('../../store/slices/adminSlice', () => ({
  setProducts: jest.fn(),
  setSearchQuery: jest.fn(),
  setSelectedCategory: jest.fn(),
  deleteCategory: jest.fn(),
  updateCategory: jest.fn(),
  getCategoryKey: jest.fn((cat) => cat.categoryKey || cat.name.toLowerCase()),
}));

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

jest.mock('./CategoryCard', () => ({
  __esModule: true,
  default: ({ category, isSelected, onClick, onDelete, onEdit, showDelete, showEdit }: any) => (
    <div data-testid={`category-${category.id || 'all'}`} data-selected={isSelected}>
      <span>{category.name}</span>
      <button onClick={onClick}>Click</button>
      {showDelete && <button data-testid={`delete-${category.id}`} onClick={() => onDelete(category.id)}>Delete</button>}
      {showEdit && <button data-testid={`edit-${category.id}`} onClick={() => onEdit(category.id)}>Edit</button>}
    </div>
  ),
}));

jest.mock('./ProductList', () => ({
  __esModule: true,
  default: ({ products }: any) => (
    <div data-testid="product-list">
      {products.map((p: any) => (
        <div key={p.id} data-testid={`product-${p.id}`}>{p.name}</div>
      ))}
    </div>
  ),
}));

jest.mock('./EditCategoryDialog', () => ({
  __esModule: true,
  default: ({ category, open, onClose, onSave }: any) =>
    open ? (
      <div data-testid="edit-dialog">
        <span>Edit {category.name}</span>
        <button onClick={onClose}>Close</button>
        <button onClick={() => onSave({ ...category, name: 'Updated' })}>Save</button>
      </div>
    ) : null,
}));

describe('AdminPage', () => {
  const mockDispatch = jest.fn();
  const mockNavigate = jest.fn();

  const mockCategories = [
    { id: 1, name: 'Пельмени', categoryKey: 'pelmeni' },
    { id: 2, name: 'Вареники', categoryKey: 'vareniki' },
  ];

  const mockProducts = [
    { id: '1', name: 'Пельмени говядина', category: 'pelmeni', price: 500 },
    { id: '2', name: 'Вареники с вишней', category: 'vareniki', price: 400 },
    { id: '3', name: 'Пельмени курица', category: 'pelmeni', price: 450 },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    (useAppDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);

    (useAppSelector as unknown as jest.Mock).mockImplementation((selector: any) => {
      const state = {
        admin: {
          products: mockProducts,
          categories: mockCategories,
          searchQuery: '',
          selectedCategory: null,
        },
        products: {
          items: mockProducts,
        },
      };
      return selector(state);
    });

    (fetchProducts as unknown as jest.Mock).mockReturnValue({ type: 'products/fetch' });
    (setProducts as unknown as jest.Mock).mockReturnValue({ type: 'admin/setProducts' });
    (setSearchQuery as unknown as jest.Mock).mockReturnValue({ type: 'admin/setSearchQuery' });
    (setSelectedCategory as unknown as jest.Mock).mockReturnValue({ type: 'admin/setSelectedCategory' });
    (deleteCategory as unknown as jest.Mock).mockReturnValue({ type: 'admin/deleteCategory' });
    (updateCategory as unknown as jest.Mock).mockReturnValue({ type: 'admin/updateCategory' });
  });

  it('renders without crashing', () => {
    render(<AdminPage />);
    expect(screen.getByText('Все товары')).toBeInTheDocument();
  });

  it('fetches products on mount', () => {
    render(<AdminPage />);
    expect(fetchProducts).toHaveBeenCalled();
    expect(mockDispatch).toHaveBeenCalledWith(expect.any(Object));
  });

  it('renders search input', () => {
    render(<AdminPage />);
    expect(screen.getByPlaceholderText('Поиск')).toBeInTheDocument();
  });

  it('renders add buttons', () => {
    render(<AdminPage />);
    expect(screen.getByText('Добавить категорию')).toBeInTheDocument();
    expect(screen.getByText('Добавить товар')).toBeInTheDocument();
  });

  it('navigates to add category page', () => {
    render(<AdminPage />);
    fireEvent.click(screen.getByText('Добавить категорию'));
    expect(mockNavigate).toHaveBeenCalledWith('/admin/category/add');
  });

  it('navigates to add product page', () => {
    render(<AdminPage />);
    fireEvent.click(screen.getByText('Добавить товар'));
    expect(mockNavigate).toHaveBeenCalledWith('/admin/product/add');
  });

  it('renders all categories', () => {
    render(<AdminPage />);
    expect(screen.getByTestId('category-all')).toBeInTheDocument();
    expect(screen.getByTestId('category-1')).toBeInTheDocument();
    expect(screen.getByTestId('category-2')).toBeInTheDocument();
  });

  it('renders product list', () => {
    render(<AdminPage />);
    expect(screen.getByTestId('product-list')).toBeInTheDocument();
    expect(screen.getByTestId('product-1')).toBeInTheDocument();
    expect(screen.getByTestId('product-2')).toBeInTheDocument();
    expect(screen.getByTestId('product-3')).toBeInTheDocument();
  });

  it('handles search input change', () => {
    render(<AdminPage />);
    const searchInput = screen.getByPlaceholderText('Поиск');
    fireEvent.change(searchInput, { target: { value: 'пельмени' } });
    expect(setSearchQuery).toHaveBeenCalledWith('пельмени');
    expect(mockDispatch).toHaveBeenCalled();
  });

  it('filters products by category', () => {
    (useAppSelector as unknown as jest.Mock).mockImplementation((selector: any) => {
      const state = {
        admin: {
          products: mockProducts,
          categories: mockCategories,
          searchQuery: '',
          selectedCategory: 1,
        },
        products: {
          items: mockProducts,
        },
      };
      return selector(state);
    });

    render(<AdminPage />);
    expect(screen.getByTestId('product-list')).toBeInTheDocument();
  });

  it('filters products by search query', () => {
    (useAppSelector as unknown as jest.Mock).mockImplementation((selector: any) => {
      const state = {
        admin: {
          products: mockProducts,
          categories: mockCategories,
          searchQuery: 'пельмени',
          selectedCategory: null,
        },
        products: {
          items: mockProducts,
        },
      };
      return selector(state);
    });

    render(<AdminPage />);
    expect(screen.getByTestId('product-list')).toBeInTheDocument();
  });

  it('handles category click for selection', () => {
    render(<AdminPage />);
    const categoryButton = screen.getByTestId('category-1').querySelector('button');
    if (categoryButton) {
      fireEvent.click(categoryButton);
    }
    expect(setSelectedCategory).toHaveBeenCalledWith(1);
    expect(mockDispatch).toHaveBeenCalled();
  });

  it('handles category click for deselection', () => {
    (useAppSelector as unknown as jest.Mock).mockImplementation((selector: any) => {
      const state = {
        admin: {
          products: mockProducts,
          categories: mockCategories,
          searchQuery: '',
          selectedCategory: 1,
        },
        products: {
          items: mockProducts,
        },
      };
      return selector(state);
    });

    render(<AdminPage />);
    const categoryButton = screen.getByTestId('category-1').querySelector('button');
    if (categoryButton) {
      fireEvent.click(categoryButton);
    }
    expect(setSelectedCategory).toHaveBeenCalledWith(null);
  });

  it('handles category delete', () => {
    render(<AdminPage />);
    fireEvent.click(screen.getByTestId('delete-1'));
    expect(deleteCategory).toHaveBeenCalledWith(1);
    expect(mockDispatch).toHaveBeenCalled();
  });

  it('handles category edit', () => {
    render(<AdminPage />);
    fireEvent.click(screen.getByTestId('edit-1'));
    expect(screen.getByTestId('edit-dialog')).toBeInTheDocument();
  });

  it('handles category save', () => {
    render(<AdminPage />);
    fireEvent.click(screen.getByTestId('edit-1'));
    fireEvent.click(screen.getByText('Save'));
    expect(updateCategory).toHaveBeenCalledWith(expect.objectContaining({ id: 1, name: 'Updated' }));
    expect(mockDispatch).toHaveBeenCalled();
  });

  it('closes edit dialog', () => {
    render(<AdminPage />);
    fireEvent.click(screen.getByTestId('edit-1'));
    fireEvent.click(screen.getByText('Close'));
    expect(screen.queryByTestId('edit-dialog')).not.toBeInTheDocument();
  });
});
