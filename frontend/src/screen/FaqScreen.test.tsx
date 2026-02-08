import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import FaqScreen from './FaqScreen';
import { theme } from '../theme/theme';

// Mock FAQ components
jest.mock('../components/FAQ/Accordion', () => ({
  __esModule: true,
  default: ({ items }: { items: any[] }) => (
    <div data-testid="accordion">
      {items.map((item) => (
        <div key={item.id} data-testid="faq-item">{item.question}</div>
      ))}
    </div>
  ),
}));

jest.mock('../components/FAQ/FaqSection', () => ({
  __esModule: true,
  SectionContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="section-container">{children}</div>
  ),
}));

jest.mock('../data/FaqData', () => ({
  faqData: [
    { id: '1', question: 'Question 1?', answer: 'Answer 1' },
    { id: '2', question: 'Question 2?', answer: 'Answer 2' },
    { id: '3', question: 'Question 3?', answer: 'Answer 3' },
    { id: '4', question: 'Question 4?', answer: 'Answer 4' },
  ],
}));

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe.skip('FaqScreen', () => {
  it('renders without crashing', () => {
    renderWithTheme(<FaqScreen />);
    expect(screen.getByTestId('section-container')).toBeInTheDocument();
  });

  it('displays FAQ title', () => {
    renderWithTheme(<FaqScreen />);
    expect(screen.getByText('ЧАСТО ЗАДАВАЕМЫЕ ВОПРОСЫ')).toBeInTheDocument();
  });

  it('renders accordions in two columns', () => {
    renderWithTheme(<FaqScreen />);
    const accordions = screen.getAllByTestId('accordion');
    expect(accordions).toHaveLength(2);
  });

  it('renders FAQ items', () => {
    renderWithTheme(<FaqScreen />);
    expect(screen.getByText('Question 1?')).toBeInTheDocument();
    expect(screen.getByText('Question 2?')).toBeInTheDocument();
  });
});
