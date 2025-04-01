import Home from "../Home";
import Register from "../Register";
import Login from "../Login";
import Profile from "../Profile";

const publicRoutes = [
    { path: '/', component: Home,layout: null},
    { path: '/albumsongdisplay/:id', component: Home, layout: null },
    { path: '/register', component: Register, layout: null},
    { path: '/login', component: Login, layout: null},
    { path: 'profile', component: Profile, layout: null},
];

const privateRoutes = [
    // { path: '/payment', component: Payment, layout: HeaderOnly, role: 'user'},
    // { path: '/customer', component: CustomerLayout,layout : null, role: 'user'},
    // { path: '/admin',component: AdminLayout, layout: null, role: 'admin'},
    // { path: '/shipper',component: ShipperLayout, layout: null, role: 'shipper'},
    // { path: '/staff',component: StaffLayout, layout: null, role: 'staff'},
];

export { publicRoutes, privateRoutes };