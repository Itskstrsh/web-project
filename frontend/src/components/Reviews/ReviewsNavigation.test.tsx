import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ReviewsNavigation from './ReviewsNavigation';

describe('ReviewsNavigation', () => {
  const mockOnPrev = jest.fn();
  const mockOnNext = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(<ReviewsNavigation onPrev={mockOnPrev} onNext={mockOnNext} />);
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(2);
  });

  it('renders prev and next buttons', () => {
    render(<ReviewsNavigation onPrev={mockOnPrev} onNext={mockOnNext} />);
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(2);
  });

  it('calls onPrev when prev button clicked', () => {
    render(<ReviewsNavigation onPrev={mockOnPrev} onNext={mockOnNext} />);
    const buttons = screen.getAllByRole('button');
    fireEvent.click(buttons[0]);
    expect(mockOnPrev).toHaveBeenCalledTimes(1);
  });

  it('calls onNext when next button clicked', () => {
    render(<ReviewsNavigation onPrev={mockOnPrev} onNext={mockOnNext} />);
    const buttons = screen.getAllByRole('button');
    fireEvent.click(buttons[1]);
    expect(mockOnNext).toHaveBeenCalledTimes(1);
  });
});
