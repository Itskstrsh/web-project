import { render, screen } from '@testing-library/react';
import Footer from './Footer';

test('renders footer', () => {
    render(<Footer />);

    expect(screen.getByText('+7 (988) 130-45-76')).toBeInTheDocument();
    expect(screen.getByText('© 2025 Винегрет. Все права защищены.')).toBeInTheDocument();
});