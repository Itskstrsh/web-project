import { whyChooseUsData } from './whyChooseUsData';

describe('whyChooseUsData', () => {
  it('should be defined', () => {
    expect(whyChooseUsData).toBeDefined();
  });

  it('should have 5 items', () => {
    expect(whyChooseUsData).toHaveLength(5);
  });

  it('should contain strings only', () => {
    whyChooseUsData.forEach(item => {
      expect(Array.isArray(item)).toBe(true);
      item.forEach((str: string) => {
        expect(typeof str).toBe('string');
      });
    });
  });

  it('should have expected content', () => {
    expect(whyChooseUsData[0]).toContain('Ручная работа');
    expect(whyChooseUsData[1]).toContain('Подходит для людей с чувствительным ЖКТ или желудком');
  });
});
