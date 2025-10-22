// store/slices/menuSlice.test.ts
import menuReducer, { toggleMenu, setMenuOpen } from './menuSlice';

describe('G3 demo — break frontend unit CI', () => {
  it('intentionally fails to verify CI blocking', () => {
    expect(true).toBe(false); // специально делаем fail
  });
});

describe('menuSlice', () => {
  const initialState = { isMenuOpen: false };

  describe('reducer', () => {
    it('should return initial state', () => {
      expect(menuReducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });

    it('should handle toggleMenu from false to true', () => {
      const actual = menuReducer(initialState, toggleMenu());
      expect(actual.isMenuOpen).toBe(true);
    });

    it('should handle toggleMenu from true to false', () => {
      const state = { isMenuOpen: true };
      const actual = menuReducer(state, toggleMenu());
      expect(actual.isMenuOpen).toBe(false);
    });

    it('should handle setMenuOpen to true', () => {
      const actual = menuReducer(initialState, setMenuOpen(true));
      expect(actual.isMenuOpen).toBe(true);
    });

    it('should handle setMenuOpen to false', () => {
      const state = { isMenuOpen: true };
      const actual = menuReducer(state, setMenuOpen(false));
      expect(actual.isMenuOpen).toBe(false);
    });

    it('should return same state for unknown action', () => {
      const state = { isMenuOpen: true };
      const actual = menuReducer(state, { type: 'unknown' });
      expect(actual).toEqual(state);
    });
  });

  describe('actions', () => {
    it('should create toggleMenu action', () => {
      expect(toggleMenu()).toEqual({
        type: 'menu/toggleMenu',
      });
    });

    it('should create setMenuOpen action', () => {
      expect(setMenuOpen(true)).toEqual({
        type: 'menu/setMenuOpen',
        payload: true,
      });
    });
  });
});