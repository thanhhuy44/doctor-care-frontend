import Home from '~/pages/Home';
import Doctor from '~/pages/Doctor';
import Admin from '~/pages/Admin';
import Category from '~/pages/Category';
import DetailDoctor from '~/pages/DetailDoctor';
import Booking from '~/pages/Booking';
import Login from '~/pages/Login';
import Signup from '~/pages/Signup';
import SingleLayout from '~/layouts/SingleLayout';
import ManagementLayout from '~/layouts/ManagementLayout';
import Hospital from '~/pages/Hospital';
import ManagementDoctor from '~/pages/managements/ManagementDoctor';
import ManagementHospital from '~/pages/managements/ManagementHospital';
import ManagementAdmin from '~/pages/managements/ManagementAdmin';
import DoctorForm from '~/components/Form/DoctorForm';
import HospitalForm from '~/components/Form/HospitalForm';
import Test from '~/pages/Test';
import MainLayout from '~/layouts/MainLayout';
import AddDoctor from '~/pages/managements/doctors/AddDoctor';
import AddHospital from '~/pages/managements/hospitals/AddHospital';

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
        path: '/hospital',
        component: Hospital,
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
    {
        path: '/admin/doctor/add',
        component: AddDoctor,
        layout: ManagementLayout,
    },
    {
        path: '/admin/doctors',
        component: ManagementDoctor,
        layout: ManagementLayout,
    },
    {
        path: '/admin/hospitals',
        component: ManagementHospital,
        layout: ManagementLayout,
    },
    {
        path: '/admin/quan-ly-admin',
        component: ManagementAdmin,
        layout: ManagementLayout,
    },
    {
        path: '/management4',
        component: Admin,
        layout: ManagementLayout,
    },
    {
        path: '/admin/hospital/add',
        component: AddHospital,
        layout: ManagementLayout,
    },
    {
        path: '/test/form',
        component: Test,
        layout: MainLayout,
    },
];

const privateRoutes = {};

export { publicRoutes, privateRoutes };
