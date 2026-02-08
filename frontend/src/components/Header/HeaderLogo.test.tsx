import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { HeaderLogo } from './HeaderLogo';
import { theme } from '../../theme/theme';

const MockedHeaderLogo: React.FC = () => (
  <MemoryRouter>
    <ThemeProvider theme={theme}>
      <HeaderLogo />
    </ThemeProvider>
  </MemoryRouter>
);

describe('HeaderLogo', () => {
  it('renders without crashing', () => {
    render(<MockedHeaderLogo />);
  });

  it('displays the logo text "ВИНЕГРЕТ"', () => {
    render(<MockedHeaderLogo />);
    
    const logoText = screen.getByText('ВИНЕГРЕТ');
    expect(logoText).toBeInTheDocument();
    expect(logoText).toHaveStyle('font-weight: 700');
  });

  it('displays the subtitle "МАГАЗИН – КУЛИНАРИЯ"', () => {
    render(<MockedHeaderLogo />);
    
    const subtitle = screen.getByText('МАГАЗИН – КУЛИНАРИЯ');
    expect(subtitle).toBeInTheDocument();
  });

  it('renders the logo letter "V" in a colored box', () => {
    render(<MockedHeaderLogo />);
    
    const logoLetter = screen.getByText('V');
    expect(logoLetter).toBeInTheDocument();
    expect(logoLetter).toHaveStyle('color: rgb(255, 255, 255)');
  });

  it('has correct link to home page', () => {
    render(<MockedHeaderLogo />);
    
    const linkElement = screen.getByText('ВИНЕГРЕТ').closest('a');
    expect(linkElement).toHaveAttribute('href', '/');
  });

  it('has proper styling for the logo container', () => {
    render(<MockedHeaderLogo />);
    
    const linkElement = screen.getByText('ВИНЕГРЕТ').closest('a');
    expect(linkElement).toHaveStyle({
      display: 'flex',
      alignItems: 'center',
      textDecoration: 'none'
    });
  });

  it('has proper structure with logo box and text container', () => {
    render(<MockedHeaderLogo />);
    
    const logoLetter = screen.getByText('V');
    const logoBox = logoLetter.parentElement;
    expect(logoBox).toBeInTheDocument();
    
    const textContainer = screen.getByText('ВИНЕГРЕТ').parentElement;
    expect(textContainer).toBeInTheDocument();
    expect(textContainer).toHaveStyle('line-height: 1');
  });
});
