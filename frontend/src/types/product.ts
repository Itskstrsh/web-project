// types/product.ts
export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  weight?: string;
  quantity?: number; // Количество товара
}