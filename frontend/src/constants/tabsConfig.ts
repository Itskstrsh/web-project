export const getTabsConfig = (categoryId: number) => {
    const tabsConfig: Record<number, Array<{ label: string; value: string }>> = {
        1: [
            { label: 'ВСЕ', value: 'all' },
            { label: 'ВЫПЕЧКА', value: 'bakery' },
            { label: 'КОНДИТЕРСКИЕ ИЗДЕЛИЯ', value: 'confectionery' }
        ],
        2: [
            { label: 'ВСЕ', value: 'all' },
            { label: 'САЛАТЫ', value: 'salads' },
            { label: 'ГОРЯЧЕЕ', value: 'hot' }
        ],
        3: [
            { label: 'ВСЕ', value: 'all' },
            { label: 'ПЕЛЬМЕНИ', value: 'frozen' },
            { label: 'ВАРЕНИКИ', value: 'frozen' },
            { label: 'ПРОЧИЕ ПОЛУФАБРИКАТЫ', value: 'frozen' },
        ],
        4: [
            { label: 'ВСЕ', value: 'all' },
            { label: 'ПИЦЦА', value: 'pizza' }
        ],
        5: [
            { label: 'ВСЕ', value: 'all' },
            { label: 'ТОРТЫ', value: 'cakes' }
        ],
        6: [
            { label: 'ВСЕ', value: 'all' },
            { label: 'НОВИНКИ', value: 'new' }
        ]
    };

    return tabsConfig[categoryId] || [{ label: 'ВСЕ', value: 'all' }];
};