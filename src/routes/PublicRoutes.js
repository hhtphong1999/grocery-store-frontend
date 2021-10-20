import Home from "../components/frontend/Home/Home";
import ProductDetail from "../components/frontend/ProductDetail";
import CategoryProduct from "../components/frontend/CategoryProduct";
import BrandProduct from "../components/frontend/BrandProduct";
import UserLogin from "../components/frontend/UserLogin";
import Register from "../components/frontend/Register";
import Contact from "../components/frontend/Contact";
import AboutUs from "../components/frontend/AboutUs";
import Cart from "../components/frontend/Cart";
import Checkout from "../components/frontend/Checkout";
import MyOrder from "../components/frontend/MyOrder";
import OrderDetail from "../components/frontend/OrderDetail";
import NewsList from "../components/frontend/News/NewsList";
import NewsDetail from "../components/frontend/News/NewsDetail";
import Wishlist from "../components/frontend/Wishlist";
import MyAccount from "../components/frontend/MyAccount";

const PublicRoutes = [
    { path: '/', exact: true, name: 'Home', component: Home },
    { path: '/user-login', exact: true, name: 'UserLogin', component: UserLogin },
    { path: '/user-register', exact: true, name: 'UserRegister', component: Register },
    { path: '/product-detail/:slug', exact: true, name: 'ProductDetail', component: ProductDetail },
    { path: '/category/:slug', exact: true, name: 'CategoryProduct', component: CategoryProduct },
    { path: '/brand/:slug', exact: true, name: 'BrandProduct', component: BrandProduct },
    { path: '/contact', exact: true, name: 'Contact', component: Contact },
    { path: '/about-us', exact: true, name: 'AboutUs', component: AboutUs },
    { path: '/product-cart', exact: true, name: 'Cart', component: Cart },
    { path: '/product-checkout', exact: true, name: 'Checkout', component: Checkout },
    { path: '/my-order', exact: true, name: 'MyOrder', component: MyOrder },
    { path: '/order-detail/:id', exact: true, name: 'OrderDetail', component: OrderDetail },
    { path: '/news', exact: true, name: 'NewsList', component: NewsList },
    { path: '/news/:slug', exact: true, name: 'NewsDetail', component: NewsDetail },
    { path: '/my-wishlist', exact: true, name: 'Wishlist', component: Wishlist },
    { path: '/my-account', exact: true, name: 'MyAccount', component: MyAccount },
];

export default PublicRoutes;