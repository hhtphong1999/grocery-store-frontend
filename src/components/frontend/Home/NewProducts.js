import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import * as CONFIG from '../../../constants/config';
import swal from 'sweetalert';

function NewProduct(props) {

    const [productList, setProductList] = useState([]);
    const [loading, setLoading] = useState(true);
    const { onAddProduct } = props;

    useEffect(() => {
        axios.get('/api/get-new-product').then(res => {
            if (res.status === 200) {
                setProductList(res.data.products);
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
    );
}

export default NewProduct;