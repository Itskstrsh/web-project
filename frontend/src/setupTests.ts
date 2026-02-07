import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';

// Polyfill для TextEncoder/TextDecoder (нужен для react-router)
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder as any;

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