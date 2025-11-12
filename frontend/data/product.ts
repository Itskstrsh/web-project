// data/products.ts
import type { Product } from '../src/types/product';

export const products: Product[] = [
  {
    id: 'pel-1',
    name: 'Пельмени Классические',
    category: 'pelmeni',
    price: 450,
    image: '/images/pelmeni-classic.jpg',
    description: 'Свинина и говядина по традиционному рецепту',
    weight: '500г'
  },
  {
    id: 'pel-2',
    name: 'Пельмени Куриные',
    category: 'pelmeni', 
    price: 420,
    image: '/images/pelmeni-chicken.jpg',
    description: 'Нежное куриное филе с луком',
    weight: '500г'
  },
  {
    id: 'pel-3',
    name: 'Пельмени С мраморной говядиной',
    category: 'pelmeni',
    price: 520,
    image: '/images/pelmeni-beef.jpg',
    description: 'Премиальная мраморная говядина',
    weight: '500г'
  },
  {
    id: 'pel-4',
    name: 'Пельмени С индейкой',
    category: 'pelmeni',
    price: 430,
    image: '/images/pelmeni-turkey.jpg',
    description: 'Диетическое мясо индейки',
    weight: '500г'
  },
  {
    id: 'pel-5',
    name: 'Пельмени С грибами',
    category: 'pelmeni',
    price: 380,
    image: '/images/pelmeni-mushrooms.jpg',
    description: 'Шампиньоны и лесные грибы',
    weight: '500г'
  },
  {
    id: 'pel-6',
    name: 'Пельмени С лососем',
    category: 'pelmeni',
    price: 580,
    image: '/images/pelmeni-salmon.jpg',
    description: 'Нежный лосось с укропом',
    weight: '500г'
  },
  {
    id: 'pel-7',
    name: 'Пельмени Деревенские',
    category: 'pelmeni',
    price: 470,
    image: '/images/pelmeni-village.jpg',
    description: 'Свинина по деревенскому рецепту',
    weight: '500г'
  },

  {
    id: 'var-1',
    name: 'Вареники С картошкой',
    category: 'vareniki',
    price: 320,
    image: '/images/vareniki-potato.jpg',
    description: 'С картофельным пюре и луком',
    weight: '500г'
  },
  {
    id: 'var-2',
    name: 'Вареники С картошкой и грибами',
    category: 'vareniki',
    price: 380,
    image: '/images/vareniki-potato-mushrooms.jpg',
    description: 'Картофель с шампиньонами',
    weight: '500г'
  },
  {
    id: 'var-3',
    name: 'Вареники С творогом',
    category: 'vareniki',
    price: 350,
    image: '/images/vareniki-curd.jpg',
    description: 'Нежный творог с ванилью',
    weight: '500г'
  },
  {
    id: 'var-4',
    name: 'Вареники С вишней',
    category: 'vareniki',
    price: 340,
    image: '/images/vareniki-cherry.jpg',
    description: 'Сочная вишня с сахаром',
    weight: '500г'
  },
  {
    id: 'var-5',
    name: 'Вареники С капустой',
    category: 'vareniki',
    price: 330,
    image: '/images/vareniki-cabbage.jpg',
    description: 'Тушеная капуста с морковью',
    weight: '500г'
  },
  {
    id: 'var-6',
    name: 'Вареники С мясом',
    category: 'vareniki',
    price: 420,
    image: '/images/vareniki-meat.jpg',
    description: 'Свинина и говядина в тонком тесте',
    weight: '500г'
  },
  {
    id: 'var-7',
    name: 'Вареники С брусникой',
    category: 'vareniki',
    price: 360,
    image: '/images/vareniki-lingonberry.jpg',
    description: 'Ароматная лесная брусника',
    weight: '500г'
  },
  {
    id: 'var-8',
    name: 'Вареники С черникой',
    category: 'vareniki',
    price: 370,
    image: '/images/vareniki-blueberry.jpg',
    description: 'Свежая черника с сахаром',
    weight: '500г'
  },
  {
    id: 'var-9',
    name: 'Вареники С клубникой',
    category: 'vareniki',
    price: 390,
    image: '/images/vareniki-strawberry.jpg',
    description: 'Сладкая клубника в нежном тесте',
    weight: '500г'
  },
  {
    id: 'var-10',
    name: 'Вареники С яблоком',
    category: 'vareniki',
    price: 340,
    image: '/images/vareniki-apple.jpg',
    description: 'Печеные яблоки с корицей',
    weight: '500г'
  },
  {
    id: 'var-11',
    name: 'Вареники С сыром',
    category: 'vareniki',
    price: 380,
    image: '/images/vareniki-cheese.jpg',
    description: 'Сырная начинка с зеленью',
    weight: '500г'
  },

  {
    id: 'bak-1',
    name: 'Круассан Классический',
    category: 'bakery',
    price: 120,
    image: '/images/croissant-classic.jpg',
    description: 'Слоеное тесто по французскому рецепту'
  },
  {
    id: 'bak-2',
    name: 'Круассан Шоколадный',
    category: 'bakery',
    price: 150,
    image: '/images/croissant-chocolate.jpg',
    description: 'С начинкой из бельгийского шоколада'
  },
  {
    id: 'bak-2',
    name: 'Паста карбонара',
    category: 'polupoker',
    price: 150,
    image: '/images/croissant-chocolate.jpg',
    description: 'С нежным соусом'
  }
];