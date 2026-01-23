// types/product.ts
export interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
  description?: string;
  category: string;
  weight?: string;
  image?: string;  // ← Должно быть image, а не imageUrl
  imageUrl?: string; // ← Если нужно оставить для обратной совместимости
}