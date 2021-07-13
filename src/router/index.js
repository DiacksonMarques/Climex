//Importação para rotas
import { createWebHistory, createRouter } from 'vue-router';

import Home from '../views/Home';
import Dashboard from '../views/Dashboard';
import NotFound from '../views/NotFound';

function guardRouteDashboard(to, from, next){
    if(localStorage.getItem('user')){
        next();
    }else{
        next('/');
    }
}

function guardRouteHome(to, from, next){
    if(localStorage.getItem('user')){
        next('/dashboard');
    }else{
        next(); 
    }
}

//Declaração das rotas
const routes = [
    {
        name: 'home',
        path: '/',
        beforeEnter: guardRouteHome,
        component: Home,
    },
    {
        name: 'dashboard',
        path: '/dashboard',
        beforeEnter: guardRouteDashboard,
        component: Dashboard,
    },
    {
        path: "/:catchAll(.*)",
        component: NotFound,
      },
];

const router = createRouter({
    history: createWebHistory(),
    routes 
});

//Exportação das rotas
export default router;