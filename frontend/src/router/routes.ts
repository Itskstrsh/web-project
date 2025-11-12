// router/routes.ts
export const routes = [
  {
    path: '/',
    component: 'HomePage',
    name: 'Главная'
  },
  {
    path: '/assortment',
    component: 'AssortmentPage', 
    name: 'Ассортимент'
  },
  {
    path: '/pelmeni',
    component: 'PelmeniPage',
    name: 'Пельмени'
  },
  {
    path: '/vareniki',
    component: 'VarenikiPage',
    name: 'Вареники'
  },
  {
    path: '/bakery',
    component: 'BakeryPage',
    name: 'Выпечка'
  },
  {
    path: '/desserts',
    component: 'DessertsPage',
    name: 'Десерты'
  }
] as const;