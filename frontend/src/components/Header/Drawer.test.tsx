import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import Drawer from './Drawer';
import { theme } from '../../theme/theme';

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <MemoryRouter>
      <ThemeProvider theme={theme}>{component}</ThemeProvider>
    </MemoryRouter>
  );
};

const mockMenuItems = [
  { label: 'Главная', href: '/' },
  { label: 'Ассортимент', href: '/assortment' },
  { label: 'Отзывы', href: '/reviews' },
];

describe('Drawer', () => {
  it('renders without crashing', () => {
    renderWithProviders(<Drawer menuItems={mockMenuItems} />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('renders menu button', () => {
    renderWithProviders(<Drawer menuItems={mockMenuItems} />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('opens drawer when button clicked', () => {
    renderWithProviders(<Drawer menuItems={mockMenuItems} />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(screen.getByText('Главная')).toBeInTheDocument();
    expect(screen.getByText('Ассортимент')).toBeInTheDocument();
    expect(screen.getByText('Отзывы')).toBeInTheDocument();
  });

  it('renders all menu items in drawer', () => {
    renderWithProviders(<Drawer menuItems={mockMenuItems} />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    mockMenuItems.forEach(item => {
      expect(screen.getByText(item.label)).toBeInTheDocument();
    });
  });

  it('renders correct number of list items', () => {
    renderWithProviders(<Drawer menuItems={mockMenuItems} />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(mockMenuItems.length);
  });
});
