import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import { FooterBottom } from './FooterBottom';
import { theme } from '../../theme/theme';

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('FooterBottom', () => {
  const currentYear = 2026;

  it('renders without crashing', () => {
    renderWithTheme(<FooterBottom currentYear={currentYear} />);
    expect(screen.getByText(`© ${currentYear} ВИНЕГРЕТ. Все права защищены.`)).toBeInTheDocument();
  });

  it('displays copyright with current year', () => {
    renderWithTheme(<FooterBottom currentYear={currentYear} />);
    expect(screen.getByText(new RegExp(`© ${currentYear}`))).toBeInTheDocument();
  });

  it('displays privacy policy link', () => {
    renderWithTheme(<FooterBottom currentYear={currentYear} />);
    expect(screen.getByText('Политика конфиденциальности')).toBeInTheDocument();
  });

  it('displays terms of use link', () => {
    renderWithTheme(<FooterBottom currentYear={currentYear} />);
    expect(screen.getByText('Условия использования')).toBeInTheDocument();
  });

  it('renders two links', () => {
    renderWithTheme(<FooterBottom currentYear={currentYear} />);
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(2);
  });
});
