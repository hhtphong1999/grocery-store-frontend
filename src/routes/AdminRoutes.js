import Dashboard from "../components/admin/dashboard/Dashboard";
import AddSlider from "../components/admin/sliders/AddSlider";
import SliderList from "../components/admin/sliders/SliderList";
import AddCategory from "../components/admin/categories/AddCategory";
import CategoryList from "../components/admin/categories/CategoryList";
import EditSlider from "../components/admin/sliders/EditSlider";
import EditCategory from "../components/admin/categories/EditCategory";
import AddBrand from "../components/admin/brands/AddBrand";
import EditBrand from "../components/admin/brands/EditBrand";
import BrandList from "../components/admin/brands/BrandList";
import AddProduct from "../components/admin/products/AddProduct";
import ProductList from "../components/admin/products/ProductList";
import EditProduct from "../components/admin/products/EditProduct";
import AddNews from "../components/admin/news/AddNews";
import NewsList from "../components/admin/news/NewsList";
import EditNews from "../components/admin/news/EditNews";
import OrderList from "../components/admin/orders/OrderList";
import OrderDetail from "../components/admin/orders/OrderDetail";
import MessageList from "../components/admin/messages/MessageList";

const AdminRoutes = [
    { path: '/admin', exact: true, name: 'Admin' },
    { path: '/admin/dashboard', exact: true, name: 'Dashboard', component: Dashboard },
    { path: '/admin/add-slider', exact: true, name: 'AddSlider', component: AddSlider },
    { path: '/admin/slider-list', exact: true, name: 'SliderList', component: SliderList },
    { path: '/admin/edit-slider/:id', exact: true, name: 'EditSlider', component: EditSlider },
    { path: '/admin/add-category', exact: true, name: 'AddCategory', component: AddCategory },
    { path: '/admin/category-list', exact: true, name: 'CategoryList', component: CategoryList },
    { path: '/admin/edit-category/:id', exact: true, name: 'EditCategory', component: EditCategory },
    { path: '/admin/add-brand', exact: true, name: 'AddBrand', component: AddBrand },
    { path: '/admin/brand-list', exact: true, name: 'BrandList', component: BrandList },
    { path: '/admin/edit-brand/:id', exact: true, name: 'EditBrand', component: EditBrand },
    { path: '/admin/add-product', exact: true, name: 'AddProduct', component: AddProduct },
    { path: '/admin/product-list', exact: true, name: 'ProductList', component: ProductList },
    { path: '/admin/edit-product/:id', exact: true, name: 'EditProduct', component: EditProduct },
    { path: '/admin/add-news', exact: true, name: 'AddNews', component: AddNews },
    { path: '/admin/news-list', exact: true, name: 'NewsList', component: NewsList },
    { path: '/admin/edit-news/:id', exact: true, name: 'EditNews', component: EditNews },
    { path: '/admin/order-list', exact: true, name: 'OrderList', component: OrderList },
    { path: '/admin/order-detail/:id', exact: true, name: 'OrderList', component: OrderDetail },
    { path: '/admin/message-list', exact: true, name: 'MessageList', component: MessageList },
];

export default AdminRoutes;