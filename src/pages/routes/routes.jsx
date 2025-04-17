import Home from "../Home";
import Register from "../Register";
import Login from "../Login";
import Profile from "../Profile";
import UploadTrack from "../UploadTrack";
import CreateAlbum from "../CreateAlbum";

const publicRoutes = [
    { path: '/', component: Home,layout: null},
    { path: '/albumsongdisplay', component: Home, layout: null },
    { path: '/register', component: Register, layout: null},
    { path: '/login', component: Login, layout: null},
    { path: '/profile', component: Profile, layout: null},
    { path: '/uploadTrack', component: UploadTrack, layout: null},
    { path: '/createAlbum', component: CreateAlbum, layout: null},
];

const privateRoutes = [
    // { path: '/payment', component: Payment, layout: HeaderOnly, role: 'user'},
    // { path: '/customer', component: CustomerLayout,layout : null, role: 'user'},
    // { path: '/admin',component: AdminLayout, layout: null, role: 'admin'},
    // { path: '/shipper',component: ShipperLayout, layout: null, role: 'shipper'},
    // { path: '/staff',component: StaffLayout, layout: null, role: 'staff'},
];

export { publicRoutes, privateRoutes };