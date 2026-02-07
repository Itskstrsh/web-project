import React from 'react';
import { render, screen } from '@testing-library/react';
import HeroFeatureItem from './HeroFeatureItem';

describe('HeroFeatureItem', () => {
  const defaultProps = {
    color: '#16A34A',
    text: 'ТЕСТОВЫЙ ТЕКСТ'
  };

  it('renders without crashing', () => {
    render(<HeroFeatureItem {...defaultProps} />);
    expect(screen.getByText(defaultProps.text)).toBeInTheDocument();
  });

  it('displays the provided text', () => {
    render(<HeroFeatureItem {...defaultProps} />);
    expect(screen.getByText('ТЕСТОВЫЙ ТЕКСТ')).toBeInTheDocument();
  });

  it('renders checkmark icon', () => {
    render(<HeroFeatureItem {...defaultProps} />);
    expect(screen.getByText('✓')).toBeInTheDocument();
  });

  it('applies correct text styling', () => {
    render(<HeroFeatureItem {...defaultProps} />);
    const textElement = screen.getByText(defaultProps.text);
    expect(textElement).toHaveClass('MuiTypography-root');
  });
});
