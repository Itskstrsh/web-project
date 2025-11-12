export interface MenuItem {
    label: string;
    to: string;
}

export const mainMenu: MenuItem[] = [
    { label: 'Главная', to: '/' },
    { label: 'Ассортимент', to: '/assortment' },
    { label: 'Пельмени', to: '/assortment/pelmeni' },
    { label: 'Вареники', to: '/assortment/vareniki' },
];

export const categoriesMenu: MenuItem[] = [
    { label: 'Пельмени', to: '/assortment/pelmeni' },
    { label: 'Вареники', to: '/assortment/vareniki' },
    { label: 'Выпечка', to: '/assortment/bakery' },
    { label: 'Десерты', to: '/assortment/desserts' },
];