import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ImageWithError from './ImageWithError';

describe('ImageWithError', () => {
  const defaultProps = {
    src: 'test-image.jpg',
    alt: 'Test Image',
  };

  it('renders without crashing', () => {
    render(<ImageWithError {...defaultProps} />);
    const img = document.querySelector('img');
    expect(img).toBeInTheDocument();
  });

  it('renders image with correct src and alt', () => {
    render(<ImageWithError {...defaultProps} />);
    const img = document.querySelector('img');
    expect(img).toHaveAttribute('src', 'test-image.jpg');
    expect(img).toHaveAttribute('alt', 'Test Image');
  });

  it('shows error placeholder when image fails to load', () => {
    render(<ImageWithError {...defaultProps} />);
    const img = document.querySelector('img');
    fireEvent.error(img!);
    expect(screen.getByText('упс, что-то пошло не так :(')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<ImageWithError {...defaultProps} className="custom-class" />);
    const img = document.querySelector('img');
    expect(img).toHaveClass('custom-class');
  });

  it('applies custom styles', () => {
    const customStyle = { width: '100px', height: '100px' };
    render(<ImageWithError {...defaultProps} style={customStyle} />);
    const img = document.querySelector('img');
    expect(img).toHaveStyle('width: 100px');
    expect(img).toHaveStyle('height: 100px');
  });
});
