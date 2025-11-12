import type { Category, Product } from '../types/data.ts';
import croissantVanilla from '../images/products/croissant-vanilla.webp'
import croissantChocolate from '../images/products/croissant-chocolate.webp'
import marshmallowCherry from '../images/products/marshmallow-cherry.webp'


export const CATEGORIES_DATA: Record<number, Category> = {
    1: {
        id: 1,
        name: 'ВЫПЕЧКА И КОНДИТЕРСКИЕ ИЗДЕЛИЯ',
        description: 'Съесть на месте и взять с собой'
    },
    2: {
        id: 2,
        name: 'ГОТОВАЯ ЕДА',
        description: 'Как в ресторане'
    },
    3: {
        id: 3,
        name: 'ЗАМОРОЖЕННЫЕ ПОЛУФАБРИКАТЫ',
        description: 'Быстрая готовка'
    },
    4: {
        id: 4,
        name: 'ПИЦЦА',
        description: 'Хит продаж'
    },
    5: {
        id: 5,
        name: 'ТОРТЫ',
        description: 'Для любого события'
    },
    6: {
        id: 6,
        name: 'НОВИНКИ',
        description: 'Хит продаж'
    }
};

export const PRODUCTS_DATA: Record<number, Product[]> = {
    1: [
        {
            id: 1,
            name: 'Круассан с заварным ванильным кремом',
            price: 120,
            image: croissantVanilla,
            unit: 'шт',
            inStock: true,
            type: 'bakery',
            composition: 'мука, вода, молоко, сахар, сливочное масло, соль, дрожжи, яйцо, ванилин, сливки',
            nutrition: {
                protein: 5.9,
                fat: 27.3,
                carbs: 37,
                calories: 417.4
            }
        },
        {
            id: 2,
            name: 'Круассан с заварным шоколадным кремом',
            price: 130,
            image: croissantChocolate,
            unit: 'шт',
            inStock: true,
            type: 'bakery',
            composition: 'мука, вода, молоко, сахар, сливочное масло, соль, дрожжи, яйцо, ванилин, сливки, алкализованный какао',
            nutrition: {
                protein: 5.9,
                fat: 27.3,
                carbs: 37,
                calories: 417.4
            }
        },
        {
            id: 3,
            name: 'Зефир вишневый - 160 г',
            price: 95,
            image: marshmallowCherry,
            unit: 'шт',
            inStock: true,
            type: 'confectionery',
            composition: 'яичный белок, сахар, пюре вишневое из цельной вишни, агар-агар, вода, пудра ванильная',
            nutrition: {
                protein: 1.0,
                fat: 0.1,
                carbs: 52.3,
                calories: 214.7
            }
        }
    ],
    2: [
        {
            id: 4,
            name: 'Салат Цезарь',
            price: 280,
            image: '/images/caesar.jpg',
            unit: 'порция',
            inStock: true,
            type: 'salads'
        }
    ]
};