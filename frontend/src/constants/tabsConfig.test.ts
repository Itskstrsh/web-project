import { getTabsConfig } from './tabsConfig';

describe('getTabsConfig', () => {
  it('should return tabs for category 1 (bakery)', () => {
    const tabs = getTabsConfig(1);
    expect(tabs).toHaveLength(3);
    expect(tabs[0].label).toBe('ВСЕ');
    expect(tabs[0].value).toBe('all');
  });

  it('should return tabs for category 2 (ready food)', () => {
    const tabs = getTabsConfig(2);
    expect(tabs).toHaveLength(3);
    expect(tabs[1].label).toBe('САЛАТЫ');
  });

  it('should return tabs for category 3 (semi-finished)', () => {
    const tabs = getTabsConfig(3);
    expect(tabs).toHaveLength(4);
    expect(tabs[1].label).toBe('ПЕЛЬМЕНИ');
  });

  it('should return default tabs for unknown category', () => {
    const tabs = getTabsConfig(999);
    expect(tabs).toHaveLength(1);
    expect(tabs[0].label).toBe('ВСЕ');
    expect(tabs[0].value).toBe('all');
  });

  it('should return tabs for category 4 (pizza)', () => {
    const tabs = getTabsConfig(4);
    expect(tabs).toHaveLength(2);
    expect(tabs[1].label).toBe('ПИЦЦА');
  });

  it('should return tabs for category 5 (cakes)', () => {
    const tabs = getTabsConfig(5);
    expect(tabs).toHaveLength(2);
    expect(tabs[1].label).toBe('ТОРТЫ');
  });

  it('should return tabs for category 6 (new)', () => {
    const tabs = getTabsConfig(6);
    expect(tabs).toHaveLength(2);
    expect(tabs[1].label).toBe('НОВИНКИ');
  });
});
