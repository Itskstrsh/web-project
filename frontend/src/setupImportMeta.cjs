// Polyfill for import.meta (Vite compatibility in Jest)
// This must run before any modules that use import.meta are loaded

Object.defineProperty(globalThis, 'import', {
  value: {
    meta: {
      env: {
        VITE_BOT_WEBHOOK_URL: 'http://localhost:3000/webhook/order',
        BASE_URL: '/',
      },
      url: 'file://',
    },
  },
  writable: true,
  configurable: true,
});
