import '@testing-library/jest-dom';

// Правильный мок для matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Мок для IntersectionObserver (для framer-motion)
const IntersectionObserverMock = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
  root: null,
  rootMargin: '',
  thresholds: [],
}));

Object.defineProperty(global, 'IntersectionObserver', {
  value: IntersectionObserverMock,
});

// Мок для TextEncoder/TextDecoder
const TextEncoderMock = jest.fn().mockImplementation(() => ({
  encode: jest.fn(),
  encodeInto: jest.fn(),
}));

const TextDecoderMock = jest.fn().mockImplementation(() => ({
  decode: jest.fn(),
}));

Object.defineProperty(global, 'TextEncoder', {
  value: TextEncoderMock,
});

Object.defineProperty(global, 'TextDecoder', {
  value: TextDecoderMock,
});