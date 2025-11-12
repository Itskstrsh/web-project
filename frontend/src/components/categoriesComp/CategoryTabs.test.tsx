import { render, screen, fireEvent } from '@testing-library/react';
import CategoryTabs from './CategoryTabs';

const mockOnChange = jest.fn();

test('renders category tabs', () => {
    render(
        <CategoryTabs
            value={0}
            onChange={mockOnChange}
            categoryId={1}
        />
    );

    expect(screen.getByText('ВСЕ')).toBeInTheDocument();
    expect(screen.getByText('ВЫПЕЧКА')).toBeInTheDocument();
    expect(screen.getByText('КОНДИТЕРСКИЕ ИЗДЕЛИЯ')).toBeInTheDocument();
});

test('calls onChange when tab is clicked', () => {
    render(
        <CategoryTabs
            value={0}
            onChange={mockOnChange}
            categoryId={1}
        />
    );

    fireEvent.click(screen.getByText('ВЫПЕЧКА'));
    expect(mockOnChange).toHaveBeenCalledWith(1);
});