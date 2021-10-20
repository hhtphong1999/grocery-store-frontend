import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import * as CONFIG from '../../../constants/config';
import { FaStar } from 'react-icons/fa';

function FeaturedProducts({onAddProduct, onAddWishlist }) {

    const [loading, setLoading] = useState(true);
    const [featuredProduct, setFeaturedProduct] = useState([]);

    useEffect(() => {
        axios.get('/api/get-featured-product').then(res => {
            if (res.status === 200) {
                setFeaturedProduct(res.data.products);
            }
            setLoading(false);
        });
    }, []);

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
        <div className="row">
            {
                featuredProduct.map(item => (
                    <div key={item.id} className="col-md-3 col-sm-6 col-xs-12">
                        <div className="product-item">
                            <div className="product-image">
                                <Link to={`product-detail/${item.slug}`}>
                                    <img src={CONFIG.BASE_URL + `${item.image}`} width='176px' alt={item.name} />
                                </Link>
                            </div>

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
                                <span className="sale-price">{CONFIG.CONVERT_TO_VND(item.selling_price)}</span> <br />
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
    );
}

export default FeaturedProducts;