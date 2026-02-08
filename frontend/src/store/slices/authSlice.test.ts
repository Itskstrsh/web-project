import authReducer, { loginAdmin, logout, clearError } from './authSlice';

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

// Mock fetch
global.fetch = jest.fn();

describe('authSlice', () => {
  const initialState = {
    isAuthenticated: false,
    isLoading: false,
    error: null,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return initial state', () => {
    expect(authReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle logout', () => {
    const state = authReducer(
      { ...initialState, isAuthenticated: true },
      logout()
    );
    expect(state.isAuthenticated).toBe(false);
    expect(localStorage.removeItem).toHaveBeenCalledWith('adminAuth');
    expect(localStorage.removeItem).toHaveBeenCalledWith('adminToken');
  });

  it('should handle clearError', () => {
    const state = authReducer(
      { ...initialState, error: 'Some error' },
      clearError()
    );
    expect(state.error).toBeNull();
  });

  describe('loginAdmin', () => {
    it('should handle pending state', () => {
      const state = authReducer(initialState, loginAdmin.pending('', 'password'));
      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('should handle fulfilled state', () => {
      const state = authReducer(
        { ...initialState, isLoading: true },
        loginAdmin.fulfilled({ token: 'test-token' }, '', 'password')
      );
      expect(state.isLoading).toBe(false);
      expect(state.isAuthenticated).toBe(true);
      expect(state.error).toBeNull();
    });

    it('should handle rejected state', () => {
      const state = authReducer(
        { ...initialState, isLoading: true },
        loginAdmin.rejected(new Error('Invalid password'), '', 'password', 'Invalid password')
      );
      expect(state.isLoading).toBe(false);
      expect(state.isAuthenticated).toBe(false);
      expect(state.error).toBe('Invalid password');
    });
  });
});
