import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

jest.mock('../hooks/redux', () => ({
  useAppSelector: jest.fn()
}));

const mockUseAppSelector = jest.requireMock('../hooks/redux').useAppSelector;

const MockedProtectedRoute: React.FC<{ initialEntries?: string[]; isAuthenticated?: boolean }> = ({ 
  initialEntries = ['/'], 
  isAuthenticated = false 
}) => {
  mockUseAppSelector.mockReturnValue({ isAuthenticated });
  
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
    jest.clearAllMocks();
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

  it('calls useAppSelector with auth state selector', () => {
    render(<MockedProtectedRoute isAuthenticated={true} />);
    
    expect(mockUseAppSelector).toHaveBeenCalledWith(expect.any(Function));
    const selectorFn = mockUseAppSelector.mock.calls[0][0];
    const mockState = { auth: { isAuthenticated: true } };
    expect(selectorFn(mockState)).toEqual({ isAuthenticated: true });
  });

  it('handles missing auth state gracefully', () => {
    mockUseAppSelector.mockReturnValue({ isAuthenticated: false });
    
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
