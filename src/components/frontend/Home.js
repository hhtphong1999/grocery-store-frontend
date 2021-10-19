import React, { useEffect } from 'react';
import axios from "axios";
import * as CONFIG from '../../constants/config';
import { useState } from 'react/cjs/react.development';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import { FaStar } from 'react-icons/fa';

import NewProductList from './Products/NewProductList';

function Home(props) {

    const [loading, setLoading] = useState(true);
    const [sliderList, setSliderList] = useState([]);
    const [productList, setProductList] = useState([]);
    const [featuredProduct, setFeaturedProduct] = useState([]);
    const [bestSellerProduct, setBestSellerProduct] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
    const { onAddProduct } = props;

    useEffect(() => {
        axios.get('/api/get-slider').then(res => {
            if (res.status === 200) {
                setSliderList(res.data.sliders);
            }
        });

        axios.get('/api/get-categories').then(res => {
            if (res.status === 200) {
                setCategoryList(res.data.categories);
            };
        });

        axios.get('/api/get-new-product').then(res => {
            if (res.status === 200) {
                setProductList(res.data.products);
            }
        });

        axios.get('/api/get-featured-product').then(res => {
            if (res.status === 200) {
                setFeaturedProduct(res.data.products);
            }
        });

        axios.get('/api/get-bestseller-product').then(res => {
            if (res.status === 200) {
                setBestSellerProduct(res.data.products);
            }
            setLoading(false);
        });
    }, []);

    const onAddWishlist = (product_id) => {
        const data = { product_id: product_id };

        axios.post('api/store-wishlist', data).then(res => {
            if (res.data.status === 200) {
                swal('Thông báo', res.data.message, 'success');
            } else if (res.data.status === 501) {
                swal('Thông báo', res.data.message, 'warning');
            } else if (res.data.status === 401) {
                swal('Thông báo', res.data.message, 'error');
            };
        });
    }

    const avgStarRating = (reviews) => {
        const avgStar = Math.round(reviews.reduce((a, c) => a + c.rating, 0) / reviews.length)
        return isNaN(avgStar) ? 0 : avgStar;
    }

    if (loading) {
        return <div id="page-preloader">
            <div className="page-loading">
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
            </div>
        </div>;
    }

    return (

        <div id="content" className="site-content">
            {/* <!-- Slideshow --> */}
            <div className="section slideshow">
                <div className="container">
                    <div className="tiva-slideshow-wrapper">
                        <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
                            <div className="carousel-inner">
                                {
                                    sliderList.map((slider, index) => {
                                        return (
                                            <div key={slider.id} className={index === 0 ? 'carousel-item active' : 'carousel-item'}>
                                                <Link to="#">
                                                    <img className="d-block w-100" src={CONFIG.BASE_URL + `${slider.image}`} alt={slider.name} />
                                                </Link>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="sr-only">Previous</span>
                            </a>
                            <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="sr-only">Next</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* <!-- Banners --> */}
            <div className="section banners">
                <div className="container">
                    <div className="row margin-10">
                        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12 padding-10">
                            <div className="banner-item effect">
                                <Link to="#">
                                    <img className="img-responsive" src="/assets/frontend/img/banner/home2-banner-1.png" alt="Banner 1" />
                                </Link>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12 padding-10">
                            <div className="banner-item effect">
                                <Link to="#">
                                    <img className="img-responsive" src="/assets/frontend/img/banner/home2-banner-2.png" alt="Banner 2" />
                                </Link>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12 padding-10">
                            <div className="banner-item effect">
                                <Link to="#">
                                    <img className="img-responsive" src="/assets/frontend/img/banner/home2-banner-3.png" alt="Banner 3" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* <!-- 2 Columns --> */}
            <div className="two-columns">
                <div className="container">
                    <div className="row ">
                        {/* <!-- Left Column --> */}
                        <div className="col-20p col-md-3 left-column">
                            {/* <!-- Product - Category --> */}
                            <div className="section product-categories">
                                <div className="block-title">
                                    <h2 className="title">Loại sản phẩm</h2>
                                </div>

                                <div className="block-content">
                                    {
                                        categoryList.map(item => (
                                            <div key={item.id} className="item">
                                                <Link className="category-title" to={`/category/${item.slug}`}>
                                                    {item.name}
                                                </Link>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>

                            {/* <!-- Payment Intro --> */}
                            <div className="section payment-intro">
                                <div className="block-content">
                                    <div className="item">
                                        <img className="img-responsive" src="/assets/frontend/img/home2-payment-1.png" alt="Payment Intro" />
                                        <h3 className="title">Free Shipping item</h3>
                                        <div className="content">Miễn phí vận chuyển cho khách hàng nội tỉnh</div>
                                    </div>
                                    <div className="item">
                                        <img className="img-responsive" src="/assets/frontend/img/home2-payment-2.png" alt="Payment Intro" />
                                        <h3 className="title">Secured Payment</h3>
                                        <div className="content">Thanh toán tiện lợi và an toàn</div>
                                    </div>
                                    <div className="item">
                                        <img className="img-responsive" src="/assets/frontend/img/home2-payment-3.png" alt="Payment Intro" />
                                        <h3 className="title">money back guarantee</h3>
                                        <div className="content">Hoàn tiền khi sản phẩm có vấn đề về chất lượng</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* <!-- Right Column --> */}
                        <div className="col-80p col-md-9 right-column">
                            {/* <!-- Product - Category Tab --> */}
                            <div className="section products-block category-tab">
                                <div className="block-content">
                                    {/* <!-- Tab Navigation --> */}

                                    <nav className="tab-nav">
                                        <div className="nav nav-tabs" id="nav-tab" role="tablist">
                                            <a className="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#new-arrivals" role="tab" aria-controls="nav-home" aria-selected="true">
                                                <span>Sản phẩm nổi bật</span>
                                            </a>
                                            <a className="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#best-seller" role="tab" aria-controls="nav-profile" aria-selected="false">
                                                <span>Sản phẩm bán chạy</span>
                                            </a>
                                        </div>
                                    </nav>

                                    <div className="tab-content" id="nav-tabContent">
                                        <div className="tab-pane fade show in active" id="new-arrivals" role="tabpanel" aria-labelledby="nav-home-tab">
                                            <NewProductList productList={featuredProduct} onAddProduct={onAddProduct} onAddWishlist={onAddWishlist} />
                                        </div>
                                        <div className="tab-pane fade" id="best-seller" role="tabpanel" aria-labelledby="nav-profile-tab">
                                            <NewProductList productList={bestSellerProduct} onAddProduct={onAddProduct} onAddWishlist={onAddWishlist} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* <!-- Product - New Arrivals --> */}
                            <div className="section products-block new-arrivals layout-3">
                                <div className="block-title">
                                    <h2 className="title">Sản phẩm <span>mới</span></h2>
                                </div>

                                <div className="block-content">
                                    <div className="row">
                                        {
                                            productList.map((item) => (
                                                <div key={item.id} className="product-item col-md-4 mr-3" style={{ maxWidth: '282px' }}>
                                                    <div style={{ width: '75px' }} className="product-image">
                                                        <Link to={`product-detail/${item.slug}`}>
                                                            <img src={CONFIG.BASE_URL + `${item.image}`} alt={item.name} />
                                                        </Link>
                                                    </div>

                                                    <div className="product-info">
                                                        <div className="product-title">
                                                            <Link to={`product-detail/${item.slug}`}>
                                                                {item.name}
                                                            </Link>
                                                        </div>

                                                        {[...Array(5)].map((star, i) => {
                                                            const ratingValue = i + 1;
                                                            return (
                                                                <label key={i}>
                                                                    <FaStar
                                                                        className="rate-star"
                                                                        color={ratingValue <= avgStarRating(item.reviews) ? "#ffc107" : "#e4e5e9"}
                                                                    />
                                                                </label>
                                                            );
                                                        })}

                                                        <div className="product-price">
                                                            <span className="sale-price">{CONFIG.CONVERT_TO_VND(item.selling_price)}</span>
                                                            <span className="base-price">{CONFIG.CONVERT_TO_VND(item.original_price)}</span>
                                                        </div>

                                                        <div className="product-buttons">
                                                            <button className="add-to-cart btn-link" onClick={() => onAddProduct(item, 1)}>
                                                                <i className="fa fa-shopping-basket" aria-hidden="true"></i>
                                                            </button>

                                                            <button className="add-wishlist btn-link" onClick={() => onAddWishlist(item.id)}>
                                                                <i className="fa fa-heart" aria-hidden="true"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>

                            {/* <!-- Banners --> */}
                            <div className="section banners-block">
                                <div className="row margin-15">
                                    <div className="col-lg-6 col-md-6 col-sm-6 padding-15">
                                        <div className="banner-item effect">
                                            <Link to="#">
                                                <img className="img-responsive" src="/assets/frontend/img/banner/home2-banner-4.png" alt="Banner" />
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-sm-6 padding-15">
                                        <div className="banner-item effect">
                                            <Link to="#">
                                                <img className="img-responsive" src="/assets/frontend/img/banner/home2-banner-5.png" alt="Banner" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>


            {/* <!-- Intro --> */}
            <div className="section intro">
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <div className="intro-header">
                                <img src="/assets/frontend/img/leaf.png" alt="Partner 1" />
                                <h3>Why Choose Us</h3>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                            <div className="intro-left">
                                <div className="intro-item">
                                    <p><img src="/assets/frontend/img/intro-icon-1.png" alt="Intro" /></p>
                                    <h4>Luôn luôn tươi mới</h4>
                                    <p>Sản phẩm luôn được bảo quản một cách tốt nhất trước khi đến tay khách hàng</p>
                                </div>

                                <div className="intro-item">
                                    <p><img src="/assets/frontend/img/intro-icon-2.png" alt="Intro" /></p>
                                    <h4>Bảo đảm sức khoẻ</h4>
                                    <p>Tất cả sản phẩm bán ra đều được trải qua quá trình kiểm tra nghiêm ngặt</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                            <div className="effect">
                                <Link to="#">
                                    <img className="intro-image img-responsive" src="/assets/frontend/img/intro-2.png" alt="Intro" />
                                </Link>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                            <div className="intro-right">
                                <div className="intro-item">
                                    <p><img src="/assets/frontend/img/intro-icon-3.png" alt="Intro" /></p>
                                    <h4>100% tự nhiên</h4>
                                    <p>Bảo đảm không chứa chất bảo quản có hại cho sức khoẻ người tiêu dùng</p>
                                </div>

                                <div className="intro-item">
                                    <p><img src="/assets/frontend/img/intro-icon-4.png" alt="Intro" /></p>
                                    <h4>Chất lượng cao</h4>
                                    <p>Chất lượng sản phẩm luôn được đặt lên hàng đầu</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
};

export default Home;