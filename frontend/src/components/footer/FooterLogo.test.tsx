import { render, screen } from '@testing-library/react';
import { FooterLogo } from './FooterLogo';

describe('FooterLogo', () => {
  it('renders without crashing', () => {
    render(<FooterLogo />);
  });

  it('displays company name', () => {
    render(<FooterLogo />);
    
    expect(screen.getByText('ВИНЕГРЕТ')).toBeInTheDocument();
    expect(screen.getByText('МАГАЗИН – КУЛИНАРИЯ')).toBeInTheDocument();
  });

  it('displays social media icons', () => {
    render(<FooterLogo />);
    
    const instagramIcon = document.querySelector('[data-testid="InstagramIcon"]');
    const telegramIcon = document.querySelector('[data-testid="TelegramIcon"]');
    const whatsappIcon = document.querySelector('[data-testid="WhatsAppIcon"]');
    
    expect(instagramIcon).toBeInTheDocument();
    expect(telegramIcon).toBeInTheDocument();
    expect(whatsappIcon).toBeInTheDocument();
  });

  it('has correct logo structure', () => {
    render(<FooterLogo />);
    
    const logoBox = document.querySelector('.MuiBox-root');
    expect(logoBox).toBeInTheDocument();
  });

  it('displays company description', () => {
    render(<FooterLogo />);
    
    expect(screen.getByText(/Пространство, где вкус сочетается с заботой и вдохновением/)).toBeInTheDocument();
  });
});
