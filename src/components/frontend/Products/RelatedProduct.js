import React from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import * as CONFIG from '../../../constants/config';
import { FaStar } from 'react-icons/fa';

const RelatedProduct = ({ relatedProducts, onAddProduct }) => {

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

    const settings = {
        dots: false,
        infinite: relatedProducts.length < 4 ? false : true,
        speed: 5000,
        autoplaySpeed: 2500,
        autoplay: true,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        cssEase: "linear",
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <div>
            <Slider {...settings}>
                {
                    relatedProducts.map(product => (
                        <div key={product.id}>
                            <div className="product-item">
                                <div className="product-image">
                                    <Link to={`/product-detail/${product.slug}`}>
                                        <img className="img-responsive" src={CONFIG.BASE_URL + `${product.image}`} alt={product.name} />
                                    </Link>
                                </div>

                                <div className="product-title">
                                    <Link to={`/product-detail/${product.slug}`}>
                                        {product.name}
                                    </Link>
                                </div>

                                {[...Array(5)].map((star, i) => {
                                    const ratingValue = i + 1;
                                    return (
                                        <label key={i}>
                                            <FaStar
                                                className="rate-star"
                                                color={ratingValue <= avgStarRating(product.reviews) ? "#ffc107" : "#e4e5e9"}
                                            />
                                        </label>
                                    );
                                })}

                                <div className="product-price">
                                    <span className="sale-price">{CONFIG.CONVERT_TO_VND(product.selling_price)}</span>
                                    <span className="base-price">{CONFIG.CONVERT_TO_VND(product.original_price)}</span>
                                </div>

                                <div className="product-buttons">
                                    <button className="add-to-cart btn-link" onClick={() => onAddProduct(product, 1)}>
                                        <i className="fa fa-shopping-basket" aria-hidden="true"></i>
                                    </button>

                                    <button className="add-wishlist btn-link" onClick={() => onAddWishlist(product.id)}>
                                        <i className="fa fa-heart" aria-hidden="true"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </Slider>
        </div>
    )
}

export default RelatedProduct;