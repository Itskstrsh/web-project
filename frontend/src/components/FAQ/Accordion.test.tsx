import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import Accordion from './Accordion';
import { theme } from '../../theme/theme';

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

const mockItems = [
  { id: '1', question: 'Question 1?', answer: 'Answer 1' },
  { id: '2', question: 'Question 2?', answer: 'Answer 2' },
];

describe('Accordion', () => {
  const mockExpanded = jest.fn(() => false);
  const mockOnChange = jest.fn(() => () => {});

  it('renders without crashing', () => {
    renderWithTheme(
      <Accordion items={mockItems} expanded={mockExpanded} onChange={mockOnChange} />
    );
    expect(screen.getByText('Question 1?')).toBeInTheDocument();
  });

  it('renders all items', () => {
    renderWithTheme(
      <Accordion items={mockItems} expanded={mockExpanded} onChange={mockOnChange} />
    );
    expect(screen.getByText('Question 1?')).toBeInTheDocument();
    expect(screen.getByText('Question 2?')).toBeInTheDocument();
  });

  it('handles empty items array', () => {
    const { container } = renderWithTheme(
      <Accordion items={[]} expanded={mockExpanded} onChange={mockOnChange} />
    );
    expect(container.firstChild).toBeInTheDocument();
  });
});
