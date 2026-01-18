import { render, screen } from '@testing-library/react';
import LoadingSpinner from './LoadingSpinner';

describe('LoadingSpinner', () => {
  it('renders without crashing', () => {
    render(<LoadingSpinner />);
  });

  it('displays loading text', () => {
    render(<LoadingSpinner />);
    
    expect(screen.getByText('Загрузка...')).toBeInTheDocument();
  });

  it('has spinning animation element', () => {
    render(<LoadingSpinner />);
    
    const spinner = document.querySelector('.animate-spin');
    expect(spinner).toBeInTheDocument();
  });

  it('has correct container structure', () => {
    render(<LoadingSpinner />);
    
    const container = document.querySelector('.min-h-screen');
    expect(container).toBeInTheDocument();
    expect(container).toHaveClass('flex', 'items-center', 'justify-center', 'bg-white');
  });

  it('has correct spinner styling', () => {
    render(<LoadingSpinner />);
    
    const spinner = document.querySelector('.w-16.h-16');
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass('border-4', 'border-green-500', 'border-t-transparent', 'rounded-full');
  });
});
