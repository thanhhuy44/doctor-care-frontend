import Home from '~/pages/Home';
import Doctor from '~/pages/Doctor';
import Admin from '~/pages/Admin';
import MainLayout from '~/layouts/MainLayout';
import UserLayout from '~/layouts/UserLayout';
import Category from '~/pages/Category/Category';
import DetailDoctor from '~/pages/DetailDoctor';
import Booking from '~/pages/Booking';

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
    {
        path: '/category',
        component: Category,
    },
    {
        path: '/detaildoctor',
        component: DetailDoctor,
    },
    {
        path: '/booking',
        component: Booking,
    },
];

const privateRoutes = {};

export { publicRoutes, privateRoutes };
