import axios from "axios";
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from "react-router-dom";
import * as CONFIG from '../../constants/config';
import swal from 'sweetalert';

import SearchBar from "./SearchBar";

function Header(props) {

    const { cart, onRemoveProduct } = props;
    const totalPrice = cart.reduce((a, c) => a + c.selling_price * c.qty, 0);
    const history = useHistory();
    const [brandList, setBrandList] = useState([]);

    useEffect(() => {
        axios.get('/api/get-brand').then(res => {
            if (res.status === 200) {
                setBrandList(res.data.brands);
            }
        })
    }, []);

    const logoutSubmit = (e) => {
        e.preventDefault();

        axios.post('/api/logout').then(res => {
            if (res.data.status === 200) {
                localStorage.removeItem('auth_token');
                localStorage.removeItem('auth_name');
                swal('Success', res.data.message, 'success');
                history.push('/');
            }
        });
    }

    return (
        <header id="header">
            {/* <!-- Topbar --> */}
            <div className="topbar">
                <div className="container topbar-content">
                    <div className="row">
                        {/* <!-- Topbar Left --> */}
                        <div className="col-md-7 col-sm-7 col-xs-12">
                            <div className="topbar-left d-flex">
                                <div className="email">
                                    <i className="fa fa-envelope" aria-hidden="true"></i>Email: 170501703@student.bdu.edu.vn
                                </div>
                                <div className="skype">
                                    <i className="fa fa-skype" aria-hidden="true"></i>Skype: thtoan1999
                                </div>
                            </div>
                        </div>

                        {/* <!-- Topbar Right --> */}
                        <div className="col-md-5 col-sm-5 col-xs-12">
                            <div className="topbar-right d-flex justify-content-end">
                                {/* <!-- My Account --> */}
                                <div className="dropdown account">
                                    <div className="dropdown-toggle" data-toggle="dropdown">
                                        {
                                            localStorage.getItem('auth_name') ? 'Hi, ' + localStorage.getItem('auth_name') : 'Tài khoản của tôi'
                                        }
                                    </div>
                                    <div className="dropdown-menu">
                                        {
                                            localStorage.getItem('auth_token') ?
                                                <div>
                                                    <div className="item">
                                                        <Link to="/my-account" title="My Account"><i className="fa fa-cog"></i>Thiết lập tài khoản</Link>
                                                    </div>
                                                    <div className="item">
                                                        <Link to="/my-wishlist" title="My Wishlists"><i className="fa fa-heart"></i>Sản phẩm yêu thích</Link>
                                                    </div>
                                                    <div className="item">
                                                        <Link to="/my-order"><i className="fa fa-book"></i>Đơn hàng đã đặt</Link>
                                                    </div>
                                                    <div className="item">
                                                        <Link to="#" onClick={logoutSubmit} title="Sign Out"><i className="fa fa-sign-out"></i>Đăng xuất</Link>
                                                    </div>
                                                </div>
                                                :
                                                (
                                                    <div>
                                                        <div className="item">
                                                            <Link to="/user-login" title="Log in to your customer account"><i className="fa fa-sign-in"></i>Đăng nhập</Link>
                                                        </div>
                                                        <div className="item">
                                                            <Link to="/user-register" title="Register Account"><i className="fa fa-user"></i>Đăng ký</Link>
                                                        </div>
                                                    </div>
                                                )
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* <!-- Header Top --> */}
            <div className="header-top">
                <div className="container">
                    <div className="row margin-0">
                        <div className="col-lg-2 col-md-2 col-sm-12 padding-0">
                            {/* <!-- Logo --> */}
                            <div className="logo">
                                <Link to="/">
                                    <img className="img-responsive" src="/assets/frontend/img/logo.png" alt="Logo" />
                                </Link>
                            </div>

                            <span id="toggle-mobile-menu"><i className="zmdi zmdi-menu"></i></span>
                        </div>

                        <div className="col-lg-7 col-md-7 col-sm-12 padding-0">
                            {/* <!-- Main Menu --> */}
                            <div id="main-menu">
                                <ul className="menu">
                                    <li>
                                        <Link to="/" title="Homepage">Trang chủ</Link>
                                    </li>

                                    <li className="dropdown">
                                        <Link to="#" title="Brand">Thương hiệu</Link>
                                        <div className="dropdown-menu" style={{ height: '400px', overflow: 'scroll' }}>
                                            <ul>
                                                {
                                                    brandList.map(brand => (
                                                        <li key={brand.id}>
                                                            <Link to={`/brand/${brand.slug}`}>{brand.name}</Link>
                                                        </li>
                                                    ))
                                                }
                                            </ul>
                                        </div>
                                    </li>

                                    <li>
                                        <Link to="/news" title="News">Tin tức & Blog</Link>
                                    </li>

                                    <li>
                                        <Link to="/about-us" title="About us">Giới thiệu</Link>
                                    </li>

                                    <li>
                                        <Link to="/contact" title="Contact">Liên hệ</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-3 col-sm-12 padding-0">
                            {/* <!-- Cart --> */}
                            <div className="block-cart dropdown">
                                <div className="cart-title">
                                    <i className="fa fa-shopping-basket"></i>
                                    <span className="cart-count">{cart.length}</span>
                                </div>

                                <div className="dropdown-content">
                                    <div className="cart-content">
                                        <table>
                                            {
                                                cart.length === 0 ?
                                                    <tbody><tr><p className="text-center">Chưa có sản phẩm trong giỏ</p></tr></tbody> :
                                                    <tbody style={{ display: 'block', maxHeight: '400px', overflow: 'auto' }}>
                                                        {
                                                            cart.map(item => (
                                                                <tr key={item.id}>
                                                                    <td className="product-image">
                                                                        <Link to={`/product-detail/${item.slug}`}>
                                                                            <img src={CONFIG.BASE_URL + `${item.image}`} alt="Product" />
                                                                        </Link>
                                                                    </td>
                                                                    <td>
                                                                        <div className="product-name">
                                                                            <Link to={`/product-detail/${item.slug}`}>{item.name}</Link>
                                                                        </div>
                                                                        <div>
                                                                            {item.qty} x <span className="product-price">{CONFIG.CONVERT_TO_VND(item.selling_price)}</span>
                                                                        </div>
                                                                    </td>
                                                                    <td className="action">
                                                                        <button className="remove btn-link" onClick={() => onRemoveProduct(item)}>
                                                                            <i className="fa fa-trash-o" aria-hidden="true"></i>
                                                                        </button>
                                                                    </td>
                                                                </tr>
                                                            ))
                                                        }
                                                        <tr className="total">
                                                            <td>Total:</td>
                                                            <td colSpan="2">{CONFIG.CONVERT_TO_VND(totalPrice)}</td>
                                                        </tr>

                                                        <tr>
                                                            <td colSpan="3">
                                                                <div className="cart-button">
                                                                    <Link className="btn btn-primary" to="/product-cart" title="View Cart">View Cart</Link>
                                                                    <Link className="btn btn-primary" to="/product-checkout" title="Checkout">Checkout</Link>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                            }
                                        </table>
                                    </div>
                                </div>
                            </div>

                            <SearchBar />
                        </div>
                    </div>
                </div>
            </div>
        </header >
    );
}

export default Header;