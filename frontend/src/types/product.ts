export interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
  description?: string;
  category: string;
  weight?: string;
  image?: string;  
  imageUrl?: string; 
}