import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

const MockedProtectedRoute: React.FC<{ initialEntries?: string[]; isAuthenticated?: boolean }> = ({ 
  initialEntries = ['/'], 
  isAuthenticated = false 
}) => {
  // Setup localStorage based on isAuthenticated
  if (isAuthenticated) {
    localStorage.setItem('adminAuth', 'true');
    localStorage.setItem('adminToken', 'some-token');
  } else {
    localStorage.removeItem('adminAuth');
    localStorage.removeItem('adminToken');
  }
  
  return (
    <MemoryRouter initialEntries={initialEntries}>
      <ProtectedRoute>
        <div data-testid="protected-content">Protected Content</div>
      </ProtectedRoute>
    </MemoryRouter>
  );
};

describe('ProtectedRoute', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('renders without crashing', () => {
    render(<MockedProtectedRoute isAuthenticated={true} />);
  });

  it('renders children when user is authenticated', () => {
    render(<MockedProtectedRoute isAuthenticated={true} />);
    
    expect(screen.getByTestId('protected-content')).toBeInTheDocument();
  });

  it('redirects to login when user is not authenticated', () => {
    render(<MockedProtectedRoute isAuthenticated={false} />);
    
    expect(screen.queryByTestId('protected-content')).not.toBeInTheDocument();
  });

  it('redirects when only adminAuth is set but no token', () => {
    localStorage.setItem('adminAuth', 'true');
    // adminToken не установлен
    
    render(
      <MemoryRouter>
        <ProtectedRoute>
          <div data-testid="protected-content">Protected Content</div>
        </ProtectedRoute>
      </MemoryRouter>
    );
    
    expect(screen.queryByTestId('protected-content')).not.toBeInTheDocument();
  });

  it('redirects when only token is set but adminAuth is not true', () => {
    localStorage.setItem('adminToken', 'some-token');
    localStorage.setItem('adminAuth', 'false');
    
    render(
      <MemoryRouter>
        <ProtectedRoute>
          <div data-testid="protected-content">Protected Content</div>
        </ProtectedRoute>
      </MemoryRouter>
    );
    
    expect(screen.queryByTestId('protected-content')).not.toBeInTheDocument();
  });
});
