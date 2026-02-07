import React from 'react';
import { render, screen } from '@testing-library/react';
import PlusIcon from './PlusIcon';

describe('PlusIcon', () => {
  it('renders without crashing', () => {
    render(<PlusIcon />);
    const svg = document.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('renders with default props', () => {
    render(<PlusIcon />);
    const svg = document.querySelector('svg');
    expect(svg).toHaveAttribute('width', '24');
    expect(svg).toHaveAttribute('height', '24');
  });

  it('renders with custom size', () => {
    render(<PlusIcon size={32} />);
    const svg = document.querySelector('svg');
    expect(svg).toHaveAttribute('width', '32');
    expect(svg).toHaveAttribute('height', '32');
  });

  it('renders with custom color', () => {
    render(<PlusIcon color="#ff0000" />);
    const g = document.querySelector('g[stroke="#ff0000"]');
    expect(g).toBeInTheDocument();
  });

  it('renders two lines (plus shape)', () => {
    render(<PlusIcon />);
    const paths = document.querySelectorAll('path');
    expect(paths).toHaveLength(2);
  });

  it('has correct viewBox', () => {
    render(<PlusIcon />);
    const svg = document.querySelector('svg');
    expect(svg).toHaveAttribute('viewBox', '0 0 24 24');
  });

  it('has presentation role', () => {
    render(<PlusIcon />);
    const svg = document.querySelector('svg');
    expect(svg).toHaveAttribute('role', 'presentation');
  });
});
