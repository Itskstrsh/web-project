import { CATEGORIES } from './categories';

describe('CATEGORIES', () => {
  it('should be defined', () => {
    expect(CATEGORIES).toBeDefined();
  });

  it('should have 6 categories', () => {
    expect(CATEGORIES).toHaveLength(6);
  });

  it('should have correct category ids', () => {
    expect(CATEGORIES[0].id).toBe(1);
    expect(CATEGORIES[1].id).toBe(2);
    expect(CATEGORIES[5].id).toBe(6);
  });

  it('should have titles', () => {
    CATEGORIES.forEach(category => {
      expect(category.title).toBeDefined();
      expect(category.title.length).toBeGreaterThan(0);
    });
  });

  it('should have subtitles', () => {
    CATEGORIES.forEach(category => {
      expect(category.subtitle).toBeDefined();
      expect(category.subtitle.length).toBeGreaterThan(0);
    });
  });
});
