import axios from 'axios';
import React from 'react';
import { useHistory } from 'react-router';
import { useEffect, useState } from 'react/cjs/react.development';
import { Link } from 'react-router-dom';
import StarRating from './Products/StarRating';
import * as CONFIG from '../../constants/config';
import swal from 'sweetalert';
import { FaStar } from 'react-icons/fa';

import RelatedProduct from './Products/RelatedProduct';

function ProductDetail(props) {

    const history = useHistory();

    const { onAddProduct } = props;
    const [product, setProduct] = useState({});
    const [reviews, setReviews] = useState([]);

    const [relatedProducts, setRelatedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [rating, setRating] = useState(1);

    const [review, setReview] = useState('');
    const [errors, setErrors] = useState([]);
    const [qty, setQty] = useState(1);

    const avgStarRating = Math.round(reviews.reduce((a, c) => a + c.rating, 0) / reviews.length);

    useEffect(() => {
        const slug = props.match.params.slug;

        axios.get(`/api/product-detail/${slug}`).then(res => {
            if (res.data.status === 200) {
                setProduct(res.data.product);
                setReviews(res.data.reviews);
            } else if (res.data.status === 404) {
                swal('Error', res.data.message, 'error');
                history.push('/');
            }
            setLoading(false);
        });

        const category_id = product.category_id;

        axios.get(`/api/related-products/${category_id}`).then(res => {
            if (res.data.status === 200) {
                setRelatedProducts(res.data.relatedProducts);
            }
        })

    }, [props.match.params.slug, history, product.category_id]);

    const submitReview = (e) => {
        e.preventDefault();

        const data = {
            product_id: product.id,
            rating: rating,
            review: review,
            created_at: new Date().toLocaleString()
        };

        axios.post('api/store-review-product', data).then(res => {
            if (res.data.status === 200) {
                setReviews([...reviews, { ...data, user: { name: localStorage.getItem('auth_name') } }].reverse());
                swal('Thông báo', res.data.message, 'success');
                setRating(1);
                setReview('');
                setErrors([]);
            } else if (res.data.status === 422) {
                swal('Thông báo', 'Vui lòng kiểm tra lại', 'error');
                setErrors(res.data.errors);
            } else if (res.data.status === 401) {
                swal('Thông báo', res.data.message, 'error');
            };
        });
    }

    const onAddWishlist = () => {
        const data = { product_id: product.id };

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
            {/* <!-- Breadcrumb --> */}
            <div id="breadcrumb">
                <div className="container">
                    <h2 className="title">{product.name}</h2>

                    <ul className="breadcrumb" style={{ display: 'contents' }}>
                        <li><Link to="/" title="Home">Home</Link></li>
                        <li><Link to={`/category/${product.category.slug}`} title="Category">{product.category.name}</Link></li>
                        <li><span>{product.name}</span></li>
                    </ul>
                </div>
            </div>


            <div className="container">
                <div className="product-detail">
                    <div className="products-block layout-5">
                        <div className="product-item">
                            <div className="product-title">
                                {product.name}
                            </div>

                            <div className="row">
                                <div className="product-left col-md-5 col-sm-5 col-xs-12">
                                    <div className="product-image vertical">
                                        <div className="main-image">
                                            <img className="img-responsive" src={CONFIG.BASE_URL + `${product.image}`} alt={product.name} />
                                        </div>
                                        <div className="thumb-images">
                                            <img className="img-responsive" src={CONFIG.BASE_URL + `${product.image}`} alt={product.name} />
                                        </div>
                                    </div>
                                </div>

                                <div className="product-right col-md-7 col-sm-7 col-xs-12">
                                    <div className="product-info">
                                        <div className="product-price">
                                            <span className="sale-price">{CONFIG.CONVERT_TO_VND(product.selling_price)}</span>
                                            <span className="base-price">{CONFIG.CONVERT_TO_VND(product.original_price)}</span>
                                        </div>

                                        <div className="product-stock">
                                            <span className="availability">Tình trạng :</span><i className="fa fa-check-square-o" aria-hidden="true"></i>Còn hàng
                                        </div>

                                        <div className="product-short-description">
                                            <p>Bảo quản: {product.preservation === 'null' ? '' : product.preservation}</p>
                                        </div>

                                        <div className="product-add-to-cart border-bottom">
                                            <div className="product-quantity">
                                                <span className="control-label">Số lượng :</span>
                                                <div className="qty">
                                                    <div className="input-group">
                                                        <input type="number" name="qty" onChange={(e) => setQty(e.target.value)} value={qty} min="1" max="10" />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="product-buttons">
                                                <button className="add-to-cart btn-link" onClick={() => onAddProduct(product, qty)}>
                                                    <i className="fa fa-shopping-basket" aria-hidden="true"></i>
                                                    <span>Thêm vào giỏ</span>
                                                </button>

                                                <button className="add-wishlist btn-link" onClick={() => onAddWishlist()}>
                                                    <i className="fa fa-heart" aria-hidden="true"></i>
                                                </button>
                                            </div>
                                        </div>

                                        <div className="product-review border-bottom">
                                            <div className="item">
                                                <div className="product-quantity">
                                                    <span className="control-label">Review :</span>
                                                    {[...Array(5)].map((star, i) => {
                                                        const ratingValue = i + 1;
                                                        return (
                                                            <label key={i}>
                                                                <FaStar
                                                                    className="rate-star"
                                                                    color={ratingValue <= (isNaN(avgStarRating) ? 0 : avgStarRating) ? "#ffc107" : "#e4e5e9"}
                                                                />
                                                            </label>
                                                        );
                                                    })}
                                                </div>
                                            </div>

                                            <div className="item">
                                                <Link to="#"><i className="zmdi zmdi-comments" aria-hidden="true"></i><span className="text">Read Reviews ({reviews.length})</span></Link>
                                            </div>
                                        </div>

                                        <div className="product-extra">
                                            <div className="item">
                                                <span className="control-label">Loại sản phẩm :</span>
                                                <Link to={`/category/${product.category.slug}`} title="Category">{product.category.name}</Link>
                                            </div>
                                            <div className="item">
                                                <span className="control-label">Thương hiệu :</span>
                                                <Link to={`/brand/${product.brand.slug}`} title="Category">{product.brand.name}</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="product-tab">
                                {/* <!-- Tab Navigation --> */}
                                <div className="tab-nav">
                                    <ul>
                                        <li className="active">
                                            <Link data-toggle="tab" to="#description">
                                                <span>Mô tả sản phẩm</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link data-toggle="tab" to="#additional-information">
                                                <span>Thông tin thêm</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link data-toggle="tab" to="#review">
                                                <span>Đánh giá</span>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>

                                {/* <!-- Tab Content --> */}
                                <div className="tab-content">
                                    {/* <!-- Description --> */}
                                    <div role="tabpanel" className="tab-pane fade in active" id="description">
                                        <section
                                            className="not-found-controller"
                                            dangerouslySetInnerHTML={{ __html: product.description }}
                                        />
                                    </div>

                                    {/* <!-- Product Tag --> */}
                                    <div role="tabpanel" className="tab-pane fade" id="additional-information">
                                        <p>Đơn vị: {product.unit}</p>
                                        <p>Bảo quản: {product.preservation === 'null' ? '' : product.preservation}</p>
                                    </div>

                                    {/* <!-- Review --> */}
                                    <div role="tabpanel" className="tab-pane fade" id="review">
                                        <div className="reviews">
                                            <div className="comments-list">
                                                {
                                                    reviews.map(item => (
                                                        <div key={item.id} className="item w-100">
                                                            <div className="comment-left pull-left">
                                                                <div className="avatar">
                                                                    <img src="/assets/frontend/img/avatar.jpg" alt="" width="70" height="70" />
                                                                </div>
                                                                {[...Array(5)].map((star, i) => {
                                                                    const ratingValue = i + 1;
                                                                    return (
                                                                        <label key={i}>
                                                                            <FaStar
                                                                                className="rate-star"
                                                                                color={ratingValue <= item.rating ? "#ffc107" : "#e4e5e9"}
                                                                            />
                                                                        </label>
                                                                    );
                                                                })}
                                                            </div>
                                                            <div className="comment-body">
                                                                <div className="comment-meta">
                                                                    <span className="author">{item.user.name}</span> - <span className="time">{CONFIG.CONVERT_DATETIME(item.created_at)}</span>
                                                                </div>
                                                                <div className="comment-content">{item.review}</div>
                                                            </div>
                                                        </div>
                                                    ))
                                                }
                                            </div>

                                            <div className="review-form">
                                                <h4 className="title">Để lại nhận xét để giúp chúng tôi hoàn thiện dịch vụ</h4>

                                                {
                                                    localStorage.getItem('auth_token') ?
                                                        <form onSubmit={submitReview} className="form-validate">
                                                            <div className="form-group">
                                                                <div className="text">Your Rating</div>
                                                                <StarRating rating={rating} setRating={setRating} />
                                                                <small className="text-danger">{errors.rating}</small>
                                                            </div>

                                                            <div className="form-group">
                                                                <div className="text">You review<sup className="required">*</sup></div>
                                                                <textarea id="review" name="review" onChange={(e) => setReview(e.target.value)} value={review} cols="45" rows="6" aria-required="true" required></textarea>
                                                                <small className="text-danger">{errors.review}</small>
                                                            </div>

                                                            <div className="form-group">
                                                                <button type="submit" className="btn btn-primary">Gửi đánh giá</button>
                                                            </div>
                                                        </form> :
                                                        <h4 className="title">Vui lòng <Link to="/user-login" className="text-blue"><u>đăng nhập</u></Link> để đánh giá sản phẩm</h4>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- Related Products --> */}
                <div className="products-block related-products item-4">
                    <div className="block-title">
                        <h2 className="title"><span>Sản phẩm</span> tương tự</h2>
                    </div>

                    <div className="block-content">
                        <RelatedProduct relatedProducts={relatedProducts} onAddProduct={onAddProduct} />
                    </div>
                </div>

            </div>
        </div>
    );
}

export default ProductDetail;