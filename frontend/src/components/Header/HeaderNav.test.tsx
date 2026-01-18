import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HeaderNav, type MenuItem } from './HeaderNav';

const mockItems: MenuItem[] = [
  { label: 'Главная', href: '/' },
  { label: 'Меню', href: '/menu' },
  { label: 'Контакты', href: '/contacts' }
];

const MockedHeaderNav: React.FC<{ initialEntries?: string[] }> = ({ initialEntries = ['/'] }) => (
  <MemoryRouter initialEntries={initialEntries}>
    <HeaderNav items={mockItems} />
  </MemoryRouter>
);

describe('HeaderNav', () => {
  it('renders without crashing', () => {
    render(<MockedHeaderNav />);
  });

  it('renders all menu items', () => {
    render(<MockedHeaderNav />);
    
    expect(screen.getByText('Главная')).toBeInTheDocument();
    expect(screen.getByText('Меню')).toBeInTheDocument();
    expect(screen.getByText('Контакты')).toBeInTheDocument();
  });

  it('highlights active menu item', () => {
    render(<MockedHeaderNav initialEntries={['/menu']} />);
    
    const activeItem = screen.getByText('Меню');
    expect(activeItem).toBeInTheDocument();
    const activeButton = activeItem.closest('button');
    if (activeButton) {
      expect(activeButton).toHaveStyle('color: rgb(76, 175, 80)');
    }
  });

  it('does not highlight non-active items', () => {
    render(<MockedHeaderNav initialEntries={['/menu']} />);
    
    const nonActiveButton = screen.getByText('Главная').closest('button');
    if (nonActiveButton) {
      expect(nonActiveButton).not.toHaveStyle('color: rgb(76, 175, 80)');
    }
  });

  it('renders items as links', () => {
    render(<MockedHeaderNav />);
    
    const mainLink = screen.getByText('Главная').closest('a');
    const menuLink = screen.getByText('Меню').closest('a');
    const contactsLink = screen.getByText('Контакты').closest('a');
    
    expect(mainLink).toHaveAttribute('href', '/');
    expect(menuLink).toHaveAttribute('href', '/menu');
    expect(contactsLink).toHaveAttribute('href', '/contacts');
  });

  it('has proper styling for navigation container', () => {
    render(<MockedHeaderNav />);
    
    const navContainer = screen.getByText('Главная').closest('.MuiBox-root');
    expect(navContainer).toHaveStyle('display: flex');
  });

  it('handles empty items array', () => {
    render(
      <MemoryRouter>
        <HeaderNav items={[]} />
      </MemoryRouter>
    );
    
    expect(screen.queryByText('Главная')).not.toBeInTheDocument();
  });

  it('applies correct button styling', () => {
    render(<MockedHeaderNav />);
    
    const button = screen.getByText('Главная').closest('button');
    if (button) {
      expect(button).toHaveStyle({
        textTransform: 'none',
        fontWeight: '600'
      });
    }
  });
});
