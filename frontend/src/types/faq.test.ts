import type { FaqItem } from './faq';

describe('FaqItem type', () => {
  it('should have valid FaqItem interface', () => {
    const faqItem: FaqItem = {
      id: '1',
      question: 'What is this?',
      answer: 'This is a test answer.',
    };
    expect(faqItem.id).toBe('1');
    expect(faqItem.question).toBe('What is this?');
    expect(faqItem.answer).toBe('This is a test answer.');
  });
});
