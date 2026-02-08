import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import AccordionItem from './AccordionItem';
import { theme } from '../../theme/theme';

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

const mockItem = {
  id: '1',
  question: 'Test Question?',
  answer: 'Test Answer',
};

describe('AccordionItem', () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    renderWithTheme(
      <AccordionItem item={mockItem} expanded={false} onChange={mockOnChange} />
    );
    expect(screen.getByText('Test Question?')).toBeInTheDocument();
  });

  it('displays the question', () => {
    renderWithTheme(
      <AccordionItem item={mockItem} expanded={false} onChange={mockOnChange} />
    );
    expect(screen.getByText('Test Question?')).toBeInTheDocument();
  });

  it('displays the answer when expanded', () => {
    renderWithTheme(
      <AccordionItem item={mockItem} expanded={true} onChange={mockOnChange} />
    );
    expect(screen.getByText('Test Answer')).toBeInTheDocument();
  });
});
