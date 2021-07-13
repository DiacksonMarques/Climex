//Importação para rotas
import { createWebHistory, createRouter } from 'vue-router';

import Home from '../views/Home';
import Dashboard from '../views/Dashboard';

//Declaração das rotas
const routes = [
    {
        name: 'home',
        path: '/',
        component: Home,
    },
    {
        name: 'dashboard',
        path: '/dashboard',
        component: Dashboard,
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes 
});

//Exportação das rotas
export default router;