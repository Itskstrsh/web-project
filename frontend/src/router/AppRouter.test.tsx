import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AppRouter from './AppRouter';

jest.mock('../components/HomePage/HomePage', () => ({
  __esModule: true,
  default: () => <div data-testid="home-page">Home Page</div>
}));

jest.mock('./ProtectedRoute', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <div data-testid="protected-route">{children}</div>
}));

jest.mock('../components/Admin/AdminLogin', () => ({
  __esModule: true,
  default: () => <div data-testid="admin-login">Admin Login</div>
}));

jest.mock('../components/Admin/AdminLayout', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="admin-layout">{children}</div>
  )
}));

jest.mock('./ProtectedRoute', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="protected-route">{children}</div>
  )
}));

jest.mock('../components/LoadingSpinner', () => ({
  __esModule: true,
  default: () => <div data-testid="loading-spinner">Loading...</div>
}));

const MockedAppRouter: React.FC<{ initialEntries?: string[] }> = ({ initialEntries = ['/'] }) => (
  <MemoryRouter initialEntries={initialEntries}>
    <AppRouter />
  </MemoryRouter>
);

describe('AppRouter', () => {
  it('renders without crashing', () => {
    render(<MockedAppRouter />);
  });

  it('renders home page on root route', () => {
    render(<MockedAppRouter initialEntries={['/']} />);
    
    expect(screen.getByTestId('home-page')).toBeInTheDocument();
  });

  it('renders protected admin routes', () => {
    render(<MockedAppRouter initialEntries={['/admin']} />);
    
    expect(screen.getByTestId('protected-route')).toBeInTheDocument();
  });

  it('redirects unknown routes to home page', () => {
    render(<MockedAppRouter initialEntries={['/unknown-route']} />);
    
    expect(screen.getByTestId('home-page')).toBeInTheDocument();
  });
});
