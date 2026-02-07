import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { FooterMenu } from './FooterMenu';
import { theme } from '../../theme/theme';

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <MemoryRouter>
      <ThemeProvider theme={theme}>{component}</ThemeProvider>
    </MemoryRouter>
  );
};

describe('FooterMenu', () => {
  const defaultProps = {
    title: 'Меню',
    items: [
      { label: 'Главная', to: '/' },
      { label: 'Ассортимент', to: '/assortment' },
      { label: 'Отзывы', to: '/reviews' },
    ]
  };

  it('renders without crashing', () => {
    renderWithProviders(<FooterMenu {...defaultProps} />);
    expect(screen.getByText('Меню')).toBeInTheDocument();
  });

  it('displays the title', () => {
    renderWithProviders(<FooterMenu {...defaultProps} />);
    expect(screen.getByText('Меню')).toBeInTheDocument();
  });

  it('renders all menu items', () => {
    renderWithProviders(<FooterMenu {...defaultProps} />);
    expect(screen.getByText('Главная')).toBeInTheDocument();
    expect(screen.getByText('Ассортимент')).toBeInTheDocument();
    expect(screen.getByText('Отзывы')).toBeInTheDocument();
  });

  it('renders correct number of links', () => {
    renderWithProviders(<FooterMenu {...defaultProps} />);
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(3);
  });
});
