import { UI, MESSAGES } from './ui';

describe('UI constants', () => {
  it('should have containerMaxWidth defined', () => {
    expect(UI.containerMaxWidth).toBe('lg');
  });

  it('should have cardImageHeight defined', () => {
    expect(UI.cardImageHeight).toBe(200);
  });

  it('should have gridSpacing defined', () => {
    expect(UI.gridSpacing).toBe(4);
  });

  it('should have productCard config', () => {
    expect(UI.productCard.imageHeight).toBe(200);
    expect(UI.productCard.hoverTransform).toBe('translateY(-4px)');
    expect(UI.productCard.transition).toBe('transform 0.2s');
  });
});

describe('MESSAGES constants', () => {
  it('should have loading message', () => {
    expect(MESSAGES.loading).toBe('Загрузка...');
  });

  it('should have categoryNotFound message', () => {
    expect(MESSAGES.categoryNotFound).toBe('Категория не найдена');
  });

  it('should have noProducts message', () => {
    expect(MESSAGES.noProducts).toBe('Товары в этой категории скоро появятся');
  });

  it('should have inStock message', () => {
    expect(MESSAGES.inStock).toBe('В наличии');
  });

  it('should have outOfStock message', () => {
    expect(MESSAGES.outOfStock).toBe('Нет в наличии');
  });
});
