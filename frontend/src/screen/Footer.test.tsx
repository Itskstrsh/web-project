import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import Footer from './Footer';
import { theme } from '../theme/theme';

jest.mock('../components/footer/FooterBottom', () => ({
  __esModule: true,
  FooterBottom: ({ currentYear }: { currentYear: number }) => (
    <div data-testid="footer-bottom">© {currentYear}</div>
  ),
}));

jest.mock('../components/footer/FooterContacts', () => ({
  __esModule: true,
  FooterContacts: () => <div data-testid="footer-contacts">Contacts</div>,
}));

jest.mock('../components/footer/FooterLogo', () => ({
  __esModule: true,
  FooterLogo: () => <div data-testid="footer-logo">Logo</div>,
}));

jest.mock('../components/footer/FooterMenu', () => ({
  __esModule: true,
  FooterMenu: ({ title }: { title: string }) => (
    <div data-testid="footer-menu">{title}</div>
  ),
}));

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('Footer', () => {
  it('renders without crashing', () => {
    renderWithTheme(<Footer />);
    expect(screen.getByTestId('footer-logo')).toBeInTheDocument();
  });

  it('displays footer logo', () => {
    renderWithTheme(<Footer />);
    expect(screen.getByTestId('footer-logo')).toBeInTheDocument();
  });

  it('displays footer contacts', () => {
    renderWithTheme(<Footer />);
    expect(screen.getByTestId('footer-contacts')).toBeInTheDocument();
  });

  it('displays footer menus', () => {
    renderWithTheme(<Footer />);
    expect(screen.getAllByTestId('footer-menu')).toHaveLength(2);
  });

  it('displays footer bottom with current year', () => {
    renderWithTheme(<Footer />);
    const currentYear = new Date().getFullYear();
    expect(screen.getByText(`© ${currentYear}`)).toBeInTheDocument();
  });
});
