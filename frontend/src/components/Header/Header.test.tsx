// src/components/Header/Header.simple.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from './Header';

// Мокаем Redux hooks
jest.mock('../../hooks/redux', () => ({
  useAppDispatch: () => jest.fn(),
  useAppSelector: () => ({ 
    cart: { items: [] },
    menu: { isMenuOpen: false }
  }),
}));

test('renders header text', () => {
  render(<Header />);
  expect(screen.getByText('ВИНЕГРЕТ')).toBeInTheDocument();
});