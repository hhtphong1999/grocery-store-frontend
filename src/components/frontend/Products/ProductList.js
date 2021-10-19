import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import { FaStar } from 'react-icons/fa';

import * as CONFIG from '../../../constants/config';

const ProductList = ({ products, onAddProduct }) => {

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

    return (
        products.map(product => (
            <div key={product.id} className="product-item">
                <div className="row">
                    <div className="col-lg-3 col-md-3 col-sm-4 col-xs-12">
                        <div className="product-image">
                            <Link to={`/product-detail/${product.slug}`}>
                                <img className="img-responsive" src={CONFIG.BASE_URL + `${product.image}`} alt={product.name} />
                            </Link>
                        </div>
                    </div>

                    <div className="col-lg-9 col-md-9 col-sm-8 col-xs-12">
                        <div className="product-info">
                            <div className="product-title">
                                <Link to={`/product-detail/${product.slug}`}>
                                    {product.name}
                                </Link>
                            </div>

                            <div className="product-rating">
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
                                <span className="review-count">({product.reviews.length} đánh giá)</span>
                            </div>

                            <div className="product-price">
                                <span className="sale-price">{CONFIG.CONVERT_TO_VND(product.selling_price)}</span>
                                <span className="base-price">{CONFIG.CONVERT_TO_VND(product.original_price)}</span>
                            </div>

                            <div className="product-stock">
                                <i className="fa fa-check-square-o" aria-hidden="true"></i>Còn hàng
                            </div>

                            <div className="product-buttons">
                                <button className="add-to-cart btn-link" onClick={() => onAddProduct(product, 1)}>
                                    <i className="fa fa-shopping-basket" aria-hidden="true"></i>
                                    <span>Add To Cart</span>
                                </button>

                                <button className="add-wishlist btn-link" onClick={() => onAddWishlist(product.id)} >
                                    <i className="fa fa-heart" aria-hidden="true"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ))
    )
}

export default ProductList;