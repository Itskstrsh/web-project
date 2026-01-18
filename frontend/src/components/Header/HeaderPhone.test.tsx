import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { HeaderPhone } from './HeaderPhone';

const theme = createTheme();

const MockedHeaderPhone: React.FC = () => (
  <ThemeProvider theme={theme}>
    <HeaderPhone />
  </ThemeProvider>
);

describe('HeaderPhone', () => {
  it('renders without crashing', () => {
    render(<MockedHeaderPhone />);
  });

  it('displays phone number', () => {
    render(<MockedHeaderPhone />);
    
    const phoneNumber = screen.getByText('+7 (988) 130-45-76');
    expect(phoneNumber).toBeInTheDocument();
  });

  it('has correct phone link', () => {
    render(<MockedHeaderPhone />);
    
    const phoneButton = screen.getByRole('link');
    expect(phoneButton).toHaveAttribute('href', 'tel:+79881304576');
  });

  it('displays phone icon', () => {
    render(<MockedHeaderPhone />);
    
    const phoneIcon = document.querySelector('svg');
    expect(phoneIcon).toBeInTheDocument();
  });

  it('has correct button styling', () => {
    render(<MockedHeaderPhone />);
    
    const button = screen.getByRole('link');
    expect(button).toHaveClass('MuiButton-containedSuccess');
    expect(button).toHaveStyle({
      textTransform: 'none',
      fontWeight: '600'
    });
  });

  it('applies hover effects', () => {
    render(<MockedHeaderPhone />);
    
    const button = screen.getByRole('link');
    expect(button).toHaveStyle('box-shadow: 0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)');
  });
});
