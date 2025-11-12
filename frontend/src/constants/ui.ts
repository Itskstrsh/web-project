export const UI = {
    containerMaxWidth: 'lg' as const,
    cardImageHeight: 200,
    gridSpacing: 4,
    productCard: {
        imageHeight: 200,
        hoverTransform: 'translateY(-4px)',
        transition: 'transform 0.2s'
    }
} as const;

export const MESSAGES = {
    loading: 'Загрузка...',
    categoryNotFound: 'Категория не найдена',
    noProducts: 'Товары в этой категории скоро появятся',
    inStock: 'В наличии',
    outOfStock: 'Нет в наличии'
} as const;