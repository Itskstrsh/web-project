import React from 'react';
import { render, screen } from '@testing-library/react';
import { SectionContainer } from './FaqSection';

describe('SectionContainer', () => {
  it('renders without crashing', () => {
    render(<SectionContainer>Content</SectionContainer>);
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('renders children content', () => {
    render(
      <SectionContainer>
        <div data-testid="child">Child Element</div>
      </SectionContainer>
    );
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('renders multiple children', () => {
    render(
      <SectionContainer>
        <div>First</div>
        <div>Second</div>
        <div>Third</div>
      </SectionContainer>
    );
    expect(screen.getByText('First')).toBeInTheDocument();
    expect(screen.getByText('Second')).toBeInTheDocument();
    expect(screen.getByText('Third')).toBeInTheDocument();
  });

  it('applies custom sx props', () => {
    render(
      <SectionContainer sx={{ backgroundColor: 'red' }}>
        Content
      </SectionContainer>
    );
    expect(screen.getByText('Content')).toBeInTheDocument();
  });
});
