import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Assortment from './Assortment';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));

const renderComponent = () => {
    return render(
        <BrowserRouter>
            <Assortment />
        </BrowserRouter>
    );
};

test('navigates to category when card is clicked', () => {
    renderComponent();

    fireEvent.click(screen.getByText('ВЫПЕЧКА И КОНДИТЕРСКИЕ ИЗДЕЛИЯ'));
    expect(mockNavigate).toHaveBeenCalledWith('/category/1');
});

test('renders all category cards', () => {
    renderComponent();

    expect(screen.getByText('ВЫПЕЧКА И КОНДИТЕРСКИЕ ИЗДЕЛИЯ')).toBeInTheDocument();
    expect(screen.getByText('ГОТОВАЯ ЕДА')).toBeInTheDocument();
    expect(screen.getByText('ЗАМОРОЖЕННЫЕ ПОЛУФАБРИКАТЫ')).toBeInTheDocument();
    expect(screen.getByText('ПИЦЦА')).toBeInTheDocument();
    expect(screen.getByText('ТОРТЫ')).toBeInTheDocument();
    expect(screen.getByText('НОВИНКИ')).toBeInTheDocument();
});