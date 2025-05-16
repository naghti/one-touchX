import PageMain from './components/page-main.vue';
import PageCatalog from './components/page-catalog.vue';
import PageBasket from './components/page-basket.vue';

import { createWebHistory, createRouter } from 'vue-router';

export const routes = [
    { path: '/', component: PageMain, name: 'Главная' },
    { path: '/catalog', component: PageCatalog, name: 'Каталог' },
    { path: '/basket', component: PageBasket, name: 'Корзина' },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
