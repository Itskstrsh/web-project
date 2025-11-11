import { render, screen } from '@testing-library/react';
import ProductCard from './ProductCard';
import type { Product } from '../../types/data';

const mockProduct: Product = {
    id: 1,
    name: 'Test Product',
    price: 100,
    image: 'test.jpg',
    unit: 'шт',
    composition: 'test ingredients',
    nutrition: {
        protein: 10,
        fat: 5,
        carbs: 20,
        calories: 150
    }
};

test('renders product card with correct information', () => {
    render(<ProductCard product={mockProduct} />);

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('Состав: test ingredients')).toBeInTheDocument();
    expect(screen.getByText('Б: 10г · Ж: 5г · У: 20г')).toBeInTheDocument();
    expect(screen.getByText('150 ккал/100г')).toBeInTheDocument();
});