import Home from '~/pages/Home';
import Admin from '~/pages/Admin';
import DetailDoctor from '~/pages/DetailDoctor';
import Booking from '~/pages/Booking';
import Login from '~/pages/Login';
import ManagementLayout from '~/layouts/ManagementLayout';
import Hospital from '~/pages/Hospital';
import ManagementDoctor from '~/pages/managements/ManagementDoctor';
import ManagementHospital from '~/pages/managements/ManagementHospital';
import ManagementAdmin from '~/pages/managements/ManagementAdmin';
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
import UpdateHospital from '~/pages/managements/hospitals/UpdateHospital';
import AddSpecialty from '~/pages/managements/specialties/AddSpecialty';
import AddTypePackage from '~/pages/managements/typePackages/AddTypePackage';
import AddPackage from '~/pages/managements/packages/AddPackage';
import ManagementBooking from '~/pages/managements/ManagementBooking';
import AllTypePackages from '~/pages/AllTypePackage';
import ManagementTypePackage from '~/pages/managements/ManagementTypePackage';
import UpdateSpecialty from '~/pages/managements/specialties/UpdateSpecialty';
import UpdateTypePackage from '~/pages/managements/typePackages/UpdateTypePackage';
import UpdatePackage from '~/pages/managements/packages/UpdatePackage';
import ManagementRating from '~/pages/managements/ManagementRating';
import Support from '~/pages/Support';
import ManagementPost from '~/pages/managements/ManagementPost';
import AddPost from '~/pages/managements/post/AddPost';
import UpdatePost from '~/pages/managements/post/UpdatePost';
import Search from '~/pages/Search';
import ChangePassword from '~/pages/managements/ChangePassword';

const publicRoutes = [
    {
        path: '/',
        component: Home,
    },
    {
        path: '/login',
        component: Login,
    },
    {
        path: '/search',
        component: Search,
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
        path: 'packages',
        component: AllTypePackages,
    },
    {
        path: '/type-package/:name/:id',
        component: AllPackages,
    },
    {
        path: '/detaildoctor',
        component: DetailDoctor,
    },
    {
        path: '/booking',
        component: Booking,
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
        path: '/health-package/:name/:id',
        component: Package,
        layout: MainLayout,
    },
    {
        path: '/specialty/:name/:id',
        component: Specialty,
        layout: MainLayout,
    },
];

const adminRoutes = [
    {
        path: '/admin',
        component: Admin,
        layout: ManagementLayout,
    },
    {
        path: '/admin/doctors',
        component: ManagementDoctor,
        layout: ManagementLayout,
    },
    {
        path: '/admin/doctor/add',
        component: AddDoctor,
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
        path: '/admin/specialties',
        component: ManagementSpecialty,
        layout: ManagementLayout,
    },
    {
        path: '/admin/specialty/add',
        component: AddSpecialty,
        layout: ManagementLayout,
    },
    {
        path: '/admin/specialty/update/:id',
        component: UpdateSpecialty,
        layout: ManagementLayout,
    },
    {
        path: '/admin/packages',
        component: ManagementPackage,
        layout: ManagementLayout,
    },
    {
        path: '/admin/package/add',
        component: AddPackage,
        layout: ManagementLayout,
    },
    {
        path: '/admin/package/update/:id',
        component: UpdatePackage,
        layout: ManagementLayout,
    },
    {
        path: '/admin/quan-ly-admin',
        component: ManagementAdmin,
        layout: ManagementLayout,
    },
    {
        path: '/admin/type-packages',
        component: ManagementTypePackage,
        layout: ManagementLayout,
    },
    {
        path: '/admin/type-package/add',
        component: AddTypePackage,
        layout: ManagementLayout,
    },
    {
        path: '/admin/type-package/update/:id',
        component: UpdateTypePackage,
        layout: ManagementLayout,
    },
    {
        path: '/admin/booking',
        component: ManagementBooking,
        layout: ManagementLayout,
    },
    {
        path: '/admin/posts',
        component: ManagementPost,
        layout: ManagementLayout,
    },
    {
        path: '/admin/post/add',
        component: AddPost,
        layout: ManagementLayout,
    },
    {
        path: '/admin/post/update/:id',
        component: UpdatePost,
        layout: ManagementLayout,
    },
    {
        path: '/admin/change-password',
        component: ChangePassword,
        layout: ManagementLayout,
    },
];

const doctorRoutes = [
    {
        path: '/doctor/management',
        component: Admin,
        layout: ManagementLayout,
    },
    {
        path: '/doctor/management/update-info/:id',
        component: UpdateDoctor,
        layout: ManagementLayout,
    },
    {
        path: '/doctor/management/orders',
        component: ManagementBooking,
        layout: ManagementLayout,
    },
    {
        path: '/doctor/management/rating',
        component: ManagementRating,
        layout: ManagementLayout,
    },
    {
        path: '/doctor/management/support',
        component: Support,
        layout: ManagementLayout,
    },
    {
        path: '/doctor/management/change-password',
        component: ChangePassword,
        layout: ManagementLayout,
    },
];

export { publicRoutes, adminRoutes, doctorRoutes };
