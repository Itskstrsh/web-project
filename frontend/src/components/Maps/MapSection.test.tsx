import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import MapSection from './MapSection';
import { theme } from '../../theme/theme';

// Mock Yandex Maps
jest.mock('@pbe/react-yandex-maps', () => ({
  YMaps: ({ children }: { children: React.ReactNode }) => <div data-testid="ymaps">{children}</div>,
  Map: ({ defaultState, children }: any) => (
    <div data-testid="map" data-center={JSON.stringify(defaultState?.center)}>{children}</div>
  ),
  Placemark: ({ geometry, properties }: any) => (
    <div data-testid="placemark" data-coords={JSON.stringify(geometry)}>{properties?.balloonContentHeader}</div>
  ),
}));

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('MapSection', () => {
  it('renders without crashing', () => {
    renderWithTheme(<MapSection />);
    expect(screen.getByText('Наши магазины')).toBeInTheDocument();
  });

  it('displays section title', () => {
    renderWithTheme(<MapSection />);
    expect(screen.getByText('Наши магазины')).toBeInTheDocument();
  });

  it('displays subtitle', () => {
    renderWithTheme(<MapSection />);
    expect(screen.getByText(/Найдите ближайший/)).toBeInTheDocument();
  });

  it('renders YMaps component', () => {
    renderWithTheme(<MapSection />);
    expect(screen.getByTestId('ymaps')).toBeInTheDocument();
  });

  it('renders Map component', () => {
    renderWithTheme(<MapSection />);
    expect(screen.getByTestId('map')).toBeInTheDocument();
  });

  it('renders Placemarks for locations', () => {
    renderWithTheme(<MapSection />);
    const placemarks = screen.getAllByTestId('placemark');
    expect(placemarks).toHaveLength(2);
  });
});
