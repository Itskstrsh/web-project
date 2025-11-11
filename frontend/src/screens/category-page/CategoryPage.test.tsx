import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CategoryPage from './CategoryPage';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: () => ({ categoryId: '1' }),
    useNavigate: () => jest.fn(),
}));

jest.mock('../../constants/mockData', () => ({
    CATEGORIES_DATA: {
        1: { id: 1, name: 'ВЫПЕЧКА И КОНДИТЕРСКИЕ ИЗДЕЛИЯ', description: 'Съесть на месте и взять с собой' }
    },
    PRODUCTS_DATA: {
        1: [
            { id: 1, name: 'Круассан', price: 120, image: 'test.jpg', unit: 'шт', inStock: true }
        ]
    }
}));

const renderComponent = () => {
    return render(
        <BrowserRouter>
            <CategoryPage />
        </BrowserRouter>
    );
};

describe('CategoryPage', () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.runOnlyPendingTimers();
        jest.useRealTimers();
        jest.clearAllMocks();
    });

    test('shows loading state initially', () => {
        renderComponent();
        expect(screen.getByText('Загрузка...')).toBeInTheDocument();
    });

    test('renders category content after loading', async () => {
        renderComponent();

        jest.advanceTimersByTime(1000);

        await waitFor(() => {
            expect(screen.getByText('ВЫПЕЧКА И КОНДИТЕРСКИЕ ИЗДЕЛИЯ')).toBeInTheDocument();
        });

        expect(screen.getByText('Назад')).toBeInTheDocument();
        expect(screen.getByText('ВСЕ')).toBeInTheDocument();
        expect(screen.getByText('Круассан')).toBeInTheDocument();
    });
});