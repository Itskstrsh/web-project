import { render, screen } from '@testing-library/react';
import ProductsGrid from './ProductsGrid';
import type { Product } from '../../types/data';

const mockProducts: Product[] = [
    {
        id: 1,
        name: 'Test Product 1',
        price: 100,
        image: 'test1.jpg',
        unit: 'шт',
        type: 'bakery'
    },
    {
        id: 2,
        name: 'Test Product 2',
        price: 200,
        image: 'test2.jpg',
        unit: 'кг',
        type: 'confectionery'
    }
];

test('renders products grid with products', () => {
    render(
        <ProductsGrid
            products={mockProducts}
            tabValue={0}
            categoryId={1}
        />
    );

    expect(screen.getByText('Test Product 1')).toBeInTheDocument();
    expect(screen.getByText('Test Product 2')).toBeInTheDocument();
});

test('shows empty state when no products', () => {
    render(
        <ProductsGrid
            products={[]}
            tabValue={0}
            categoryId={1}
        />
    );

    expect(screen.getByText('Здесь пока ничего нет')).toBeInTheDocument();
});

test('filters products by tab', () => {
    render(
        <ProductsGrid
            products={mockProducts}
            tabValue={1} // bakery tab
            categoryId={1}
        />
    );

    // Should only show bakery products
    expect(screen.getByText('Test Product 1')).toBeInTheDocument();
    expect(screen.queryByText('Test Product 2')).not.toBeInTheDocument();
});