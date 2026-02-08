import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import FaqScreen from './FaqScreen';
import { theme } from '../theme/theme';

jest.mock('../../data/FaqData', () => ({
  faqData: [
    { id: '1', question: 'Q1?', answer: 'A1' },
    { id: '2', question: 'Q2?', answer: 'A2' },
  ],
}));

jest.mock('../components/FAQ/Accordion', () => ({
  __esModule: true,
  default: ({ items }: { items: any[] }) => (
    <div data-testid="accordion">{items.length}</div>
  ),
}));

jest.mock('../components/FAQ/FaqSection', () => ({
  SectionContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="section">{children}</div>
  ),
}));

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('FaqScreen', () => {
  it('renders page', () => {
    renderWithTheme(<FaqScreen />);
    expect(screen.getByText('ЧАСТО ЗАДАВАЕМЫЕ ВОПРОСЫ')).toBeInTheDocument();
  });

  it('renders accordions', () => {
    renderWithTheme(<FaqScreen />);
    expect(screen.getAllByTestId('accordion').length).toBe(2);
  });
});
