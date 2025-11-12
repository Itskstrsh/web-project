export interface Nutrition {
    protein: number;
    fat: number;
    carbs: number;
    calories: number;
}

export type ProductType = 'bakery' | 'confectionery' | 'salads' | 'hot' | 'frozen' | 'pizza' | 'cakes' | 'new';

export interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
    unit: string;
    inStock?: boolean;
    type?: ProductType;
    composition?: string;
    nutrition?: Nutrition;
}

export interface Category {
    id: number;
    name: string;
    description: string;
}