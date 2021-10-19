import React from 'react';
import { Route, Switch } from 'react-router';
import { useEffect, useState } from 'react';
import swal from 'sweetalert';
import { Link } from 'react-router-dom';
import MessengerCustomerChat from 'react-messenger-customer-chat';

import PublicRoutes from '../../routes/PublicRoutes';
import Footer from './Footer';
import Header from './Header';

const FrontendLayout = () => {

    const [cart, setCart] = useState([]);

    const onAddProduct = (product, qty) => {
        const exist = cart.find((x) => x.id === product.id);
        const quantity = parseInt(qty);

        if (exist) {
            swal({ title: 'Thông báo', text: 'Sản phẩm đã được thêm vào giỏ', icon: 'warning' });
        } else {
            if (isNaN(quantity) || quantity > 10 || quantity < 1) {
                swal({ title: 'Thông báo', text: 'Có lỗi xảy ra vui lòng thử lại', icon: 'error' });
            } else {
                const newCart = [...cart, { ...product, qty: quantity }];
                setCart(newCart);
                localStorage.setItem('cart', JSON.stringify(newCart));
                swal({ title: 'Thêm vào giỏ hàng', text: 'Thành công', icon: 'success', timer: 1000, buttons: false });
            }
        }
    }

    const onRemoveProduct = (product) => {
        const exist = cart.find((x) => x.id === product.id);

        if (exist) {
            var index = findIndex(product.id);
            const newCart = [...cart];
            newCart.splice(index, 1);
            setCart(newCart);
            localStorage.setItem('cart', JSON.stringify(newCart));
        }
    }

    const onDecreaseProduct = (product) => {
        const exist = cart.find((x) => x.id === product.id);

        if (exist.qty > 1) {
            var index = findIndex(product.id);
            const newCart = [...cart];
            newCart[index] = { ...exist, qty: exist.qty - 1 };
            setCart(newCart);
            localStorage.setItem('cart', JSON.stringify(newCart));
            swal({ title: 'Cập nhật giỏ hàng', text: 'Thành công', icon: 'success', timer: 1000, buttons: false });
        }
    }

    const onIncreaseProduct = (product) => {
        const exist = cart.find((x) => x.id === product.id);

        if (exist.qty < 10) {
            var index = findIndex(product.id);
            const newCart = [...cart];
            newCart[index] = { ...exist, qty: exist.qty + 1 };
            setCart(newCart);
            localStorage.setItem('cart', JSON.stringify(newCart));
            swal({ title: 'Cập nhật giỏ hàng', text: 'Thành công', icon: 'success', timer: 1000, buttons: false });
        }
    }

    const onDestroyCart = () => {
        localStorage.removeItem('cart');
        setCart([]);
    }

    const findIndex = (id) => {
        var arr = cart;
        var result = -1;
        arr.forEach((product, index) => {
            if (product.id === id)
                result = index;
        });
        return result;
    }

    useEffect(() => {
        if (localStorage && localStorage.getItem('cart')) {
            var cart = JSON.parse(localStorage.getItem('cart'));
            setCart(cart);
        }
    }, []);

    return (
        <div className="home home-2">
            <div id="all">
                <Header cart={cart} onRemoveProduct={onRemoveProduct} />

                <Switch>
                    {PublicRoutes.map((routedata, idx) => {
                        return (
                            routedata.component && (
                                <Route
                                    key={idx}
                                    path={routedata.path}
                                    exact={routedata.exact}
                                    name={routedata.name}
                                    render={(props) => (
                                        <routedata.component {...props}
                                            cart={cart}
                                            onAddProduct={onAddProduct}
                                            onRemoveProduct={onRemoveProduct}
                                            onIncreaseProduct={onIncreaseProduct}
                                            onDecreaseProduct={onDecreaseProduct}
                                            onDestroyCart={onDestroyCart} />
                                    )}
                                />
                            )
                        )
                    })}
                </Switch>

                <Footer />

                {/* <MessengerCustomerChat
                    pageId="2065641990360139"
                    appId="<APP_ID>"
                /> */}

                {/* <!-- Go Up button --> */}
                <div className="go-up">
                    <a href="#">
                        <i className="fa fa-long-arrow-up"></i>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default FrontendLayout;