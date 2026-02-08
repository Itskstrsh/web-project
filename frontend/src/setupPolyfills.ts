// Polyfills for Jest tests - runs before test framework is loaded
declare const require: (name: string) => { TextEncoder: unknown; TextDecoder: unknown };
declare const global: {
  TextEncoder: unknown;
  TextDecoder: unknown;
};

 
const { TextEncoder, TextDecoder } = require('util');

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
