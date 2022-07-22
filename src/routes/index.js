import Home from '~/pages/Home';
import Doctor from '~/pages/Doctor';
import Admin from '~/pages/Admin';
import MainLayout from '~/layouts/MainLayout';
import UserLayout from '~/layouts/UserLayout';

const publicRoutes = [
    {
        path: '/',
        component: Home,
    },
    {
        path: '/doctor',
        component: Doctor,
    },
    {
        path: '/admin',
        component: Admin,
        layout: null,
    },
];

const privateRoutes = {};

export { publicRoutes, privateRoutes };
