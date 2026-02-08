const path = require('path');

module.exports = {
  rootDir: path.resolve(__dirname),
  testEnvironment: 'jest-environment-jsdom',
  setupFiles: ['<rootDir>/src/setupImportMeta.cjs'],
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  transform: {
    '^.+\\.(t|j)sx?$': ['babel-jest', {
      presets: [
        ['@babel/preset-env', { targets: { node: 'current' }, modules: 'commonjs' }],
        ['@babel/preset-react', { runtime: 'automatic' }],
        ['@babel/preset-typescript', { allowDeclareFields: true }],
      ],
      plugins: [
        'babel-plugin-transform-import-meta'
      ]
    }],
  },
  moduleFileExtensions: ['ts','tsx','js','jsx','json'],
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js',
    '^../store/slices/orderSlice$': '<rootDir>/src/__mocks__/orderSliceMock.ts',
    '^../../store/slices/orderSlice$': '<rootDir>/src/__mocks__/orderSliceMock.ts',
    '^./HeaderNav$': '<rootDir>/src/__mocks__/HeaderNavMock.tsx',
    '^../Header/HeaderNav$': '<rootDir>/src/__mocks__/HeaderNavMock.tsx',
  },

  collectCoverage: true,
  testPathIgnorePatterns: [
    '/node_modules/',
    'App\.test\.tsx$',
    'AppRouter\.test\.tsx$',
    'HeaderNav\.test\.tsx$',
  ],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx,js,jsx}',
    '!**/*.d.ts',
    '!**/*.test.*',
    '!**/__tests__/**'
  ],
  coverageDirectory: 'coverage/unit',
  coverageReporters: ['text','lcov','html'],
  coverageThreshold: { global: { lines: 80 } }
};
