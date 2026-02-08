import type { Nutrition, Product, Category, ProductType } from './data';

describe('Types', () => {
  it('should have valid Nutrition interface', () => {
    const nutrition: Nutrition = {
      protein: 10,
      fat: 5,
      carbs: 20,
      calories: 150,
    };
    expect(nutrition.protein).toBe(10);
    expect(nutrition.fat).toBe(5);
    expect(nutrition.carbs).toBe(20);
    expect(nutrition.calories).toBe(150);
  });

  it('should have valid ProductType', () => {
    const productType: ProductType = 'bakery';
    expect(productType).toBe('bakery');
  });

  it('should have valid Product interface', () => {
    const product: Product = {
      id: 1,
      name: 'Test Product',
      price: 100,
      image: 'test.jpg',
      unit: 'шт',
      inStock: true,
      type: 'bakery',
    };
    expect(product.id).toBe(1);
    expect(product.name).toBe('Test Product');
    expect(product.price).toBe(100);
  });

  it('should have valid Category interface', () => {
    const category: Category = {
      id: 1,
      name: 'Test Category',
      description: 'Test Description',
    };
    expect(category.id).toBe(1);
    expect(category.name).toBe('Test Category');
  });
});
