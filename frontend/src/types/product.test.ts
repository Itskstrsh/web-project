import type { Product } from './product';

describe('Product type', () => {
  it('should have valid Product interface', () => {
    const product: Product = {
      id: '1',
      name: 'Test Product',
      price: 100,
      quantity: 5,
      description: 'Test Description',
      category: 'test',
      weight: '500g',
      image: 'test.jpg',
    };
    expect(product.id).toBe('1');
    expect(product.name).toBe('Test Product');
    expect(product.price).toBe(100);
    expect(product.quantity).toBe(5);
  });

  it('should work with minimal Product data', () => {
    const product: Product = {
      id: '2',
      name: 'Minimal Product',
      price: 50,
      quantity: 1,
      category: 'minimal',
    };
    expect(product.id).toBe('2');
    expect(product.name).toBe('Minimal Product');
  });
});
