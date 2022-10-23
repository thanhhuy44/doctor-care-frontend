import Home from '~/pages/Home';
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
import Test from '~/pages/Test';
import MainLayout from '~/layouts/MainLayout';
import AddDoctor from '~/pages/managements/doctors/AddDoctor';
import AddHospital from '~/pages/managements/hospitals/AddHospital';
import AllDoctors from '~/pages/AllDoctors';
import AllHospitals from '~/pages/AllHospitals';
import AllSpecialties from '~/pages/AllSpecialties';
import AllPackages from '~/pages/AllPackages';
import Package from '~/pages/Package';
import Specialty from '~/pages/Specialty';
import ManagementSpecialty from '~/pages/managements/ManagementSpecialty';
import ManagementPackage from '~/pages/managements/ManagementPackage';
import UpdateDoctor from '~/pages/managements/doctors/UpdateDoctor';
import UpdateHospital from '~/pages/managements/hospitals/UpdateHospital/UpdateHospital';
import AddSpecialty from '~/pages/managements/specialties/AddSpecialty/AddSpecialty';
import AddTypePackage from '~/pages/managements/typePackages/AddTypePackage/AddTypePackage';
import AddPackage from '~/pages/managements/packages/AddPackage';
import ManagementBooking from '~/pages/managements/ManagementBooking/ManagementBooking';

const publicRoutes = [
    {
        path: '/',
        component: Home,
    },
    {
        path: '/doctors',
        component: AllDoctors,
    },
    {
        path: '/hospitals',
        component: AllHospitals,
    },
    {
        path: '/specialties',
        component: AllSpecialties,
    },
    {
        path: '/packages',
        component: AllPackages,
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
        path: '/admin/doctor/update/:id',
        component: UpdateDoctor,
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
        path: '/admin/specialties',
        component: ManagementSpecialty,
        layout: ManagementLayout,
    },
    {
        path: '/admin/packages',
        component: ManagementPackage,
        layout: ManagementLayout,
    },
    {
        path: '/admin/hospital/add',
        component: AddHospital,
        layout: ManagementLayout,
    },
    {
        path: '/admin/hospital/update/:id',
        component: UpdateHospital,
        layout: ManagementLayout,
    },
    {
        path: '/admin/specialty/add',
        component: AddSpecialty,
        layout: ManagementLayout,
    },
    {
        path: '/admin/type-package/add',
        component: AddTypePackage,
        layout: ManagementLayout,
    },
    {
        path: '/admin/package/add',
        component: AddPackage,
        layout: ManagementLayout,
    },
    {
        path: '/admin/booking',
        component: ManagementBooking,
        layout: ManagementLayout,
    },

    //page detail
    {
        path: '/hospital/:name/:id',
        component: Hospital,
        layout: MainLayout,
    },
    {
        path: '/doctor/:name/:id',
        component: DetailDoctor,
        layout: MainLayout,
    },

    {
        path: '/package/:name/:id',
        component: Package,
        layout: MainLayout,
    },
    {
        path: '/specialty/:name/:id',
        component: Specialty,
        layout: MainLayout,
    },
];

const privateRoutes = {};

export { publicRoutes, privateRoutes };
