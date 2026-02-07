import React from 'react';
import { render, screen } from '@testing-library/react';
import ReviewsTitle from './ReviewsTitle';

describe('ReviewsTitle', () => {
  it('renders without crashing', () => {
    render(<ReviewsTitle />);
    expect(screen.getByText('ОТЗЫВЫ')).toBeInTheDocument();
  });

  it('renders as h1 element', () => {
    render(<ReviewsTitle />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent('ОТЗЫВЫ');
  });

  it('has correct text content', () => {
    render(<ReviewsTitle />);
    expect(screen.getByText('ОТЗЫВЫ')).toBeInTheDocument();
  });

  it('has correct heading level', () => {
    render(<ReviewsTitle />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
  });
});
