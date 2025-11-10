import bakeryProd from "../../images/categoryImages/bakeryProd.png"
import cake from "../../images/categoryImages/cake.png"
import newProd from "../../images/categoryImages/new.webp"
import pizza from "../../images/categoryImages/pizza.webp"
import readyFood from "../../images/categoryImages/readyMadeFood.png"
import semiFood from "../../images/categoryImages/semiFinishedProd.webp"

export const CATEGORIES = [
    {
        id: 1,
        image: bakeryProd,
        title: 'ВЫПЕЧКА И КОНДИТЕРСКИЕ ИЗДЕЛИЯ',
        subtitle: 'Съесть на месте и взять с собой'
    },
    {
        id: 2,
        image: readyFood,
        title: 'ГОТОВАЯ ЕДА',
        subtitle: 'Как в ресторане'
    },
    {
        id: 3,
        image: semiFood,
        title: 'ЗАМОРОЖЕННЫЕ ПОЛУФАБРИКАТЫ',
        subtitle: 'Быстрая готовка'
    },
    {
        id: 4,
        image: pizza,
        title: 'ПИЦЦА',
        subtitle: 'Хит продаж'
    },
    {
        id: 5,
        image: cake,
        title: 'ТОРТЫ',
        subtitle: 'Для любого события'
    },
    {
        id: 6,
        image: newProd,
        title: 'НОВИНКИ',
        subtitle: 'Хит продаж'
    },
] as const;