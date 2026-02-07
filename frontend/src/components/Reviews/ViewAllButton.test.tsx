import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import ViewAllButton from './ViewAllButton';
import { theme } from '../../theme/theme';

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <MemoryRouter>
      <ThemeProvider theme={theme}>{component}</ThemeProvider>
    </MemoryRouter>
  );
};

describe('ViewAllButton', () => {
  it('renders without crashing', () => {
    renderWithProviders(<ViewAllButton />);
    expect(screen.getByText('Посмотреть все отзывы')).toBeInTheDocument();
  });

  it('displays the button text', () => {
    renderWithProviders(<ViewAllButton />);
    expect(screen.getByText('Посмотреть все отзывы')).toBeInTheDocument();
  });

  it('renders as a button', () => {
    renderWithProviders(<ViewAllButton />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('button is clickable', () => {
    renderWithProviders(<ViewAllButton />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(button).toBeInTheDocument();
  });
});
