import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import { FooterContacts } from './FooterContacts';
import { theme } from '../../theme/theme';

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('FooterContacts', () => {
  it('renders without crashing', () => {
    renderWithTheme(<FooterContacts />);
    expect(screen.getByText('Контакты')).toBeInTheDocument();
  });

  it('displays the contacts title', () => {
    renderWithTheme(<FooterContacts />);
    expect(screen.getByText('Контакты')).toBeInTheDocument();
  });

  it('displays the phone number', () => {
    renderWithTheme(<FooterContacts />);
    expect(screen.getByText('+7 (988) 130-45-76')).toBeInTheDocument();
  });

  it('displays the email', () => {
    renderWithTheme(<FooterContacts />);
    expect(screen.getByText('order@vinegret.ru')).toBeInTheDocument();
  });

  it('displays phone hours', () => {
    renderWithTheme(<FooterContacts />);
    expect(screen.getByText('Ежедневно с 9:00 до 21:00')).toBeInTheDocument();
  });

  it('displays all addresses', () => {
    renderWithTheme(<FooterContacts />);
    expect(screen.getByText(/Новороссийск.*МЫсхакское Шоссе/i)).toBeInTheDocument();
  });
});
