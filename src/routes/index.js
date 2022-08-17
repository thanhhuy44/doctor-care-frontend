import Home from '~/pages/Home';
import Doctor from '~/pages/Doctor';
import Admin from '~/pages/Admin';
import MainLayout from '~/layouts/MainLayout';
import UserLayout from '~/layouts/UserLayout';
import Category from '~/pages/Category/Category';
import DetailDoctor from '~/pages/DetailDoctor';
import Booking from '~/pages/Booking';
import Login from '~/pages/Login';
import Signup from '~/pages/Signup';
import SingleLayout from '~/layouts/SingleLayout';
import ManagementLayout from '~/layouts/ManagementLayout';

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
    {
        path: '/login',
        component: Login,
        layout: SingleLayout,
    },
    {
        path: '/signup',
        component: Signup,
        layout: SingleLayout,
    },
    {
        path: '/admin',
        component: Admin,
        layout: ManagementLayout,
    },
];

const privateRoutes = {};

export { publicRoutes, privateRoutes };
