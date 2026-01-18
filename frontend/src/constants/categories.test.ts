import { CATEGORIES } from './categories';

describe('CATEGORIES', () => {
  it('should export categories array', () => {
    expect(Array.isArray(CATEGORIES)).toBe(true);
  });

  it('should have required category structure', () => {
    CATEGORIES.forEach(category => {
      expect(category).toHaveProperty('id');
      expect(category).toHaveProperty('image');
      expect(category).toHaveProperty('title');
      expect(category).toHaveProperty('subtitle');
    });
  });

  it('should have bakery category', () => {
    const bakeryCategory = CATEGORIES.find(cat => cat.id === 1);
    expect(bakeryCategory).toBeDefined();
    expect(bakeryCategory?.title).toBe('ВЫПЕЧКА И КОНДИТЕРСКИЕ ИЗДЕЛИЯ');
  });

  it('should have ready food category', () => {
    const readyFoodCategory = CATEGORIES.find(cat => cat.id === 2);
    expect(readyFoodCategory).toBeDefined();
    expect(readyFoodCategory?.title).toBe('ГОТОВАЯ ЕДА');
  });

  it('should not be empty', () => {
    expect(CATEGORIES.length).toBeGreaterThan(0);
  });

  it('should have 6 categories', () => {
    expect(CATEGORIES.length).toBe(6);
  });
});
