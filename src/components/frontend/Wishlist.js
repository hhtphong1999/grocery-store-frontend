import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import * as CONFIG from '../../constants/config';

function Wishlist() {

    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('/api/get-wishlist').then(res => {
            if (res.data.status === 200) {
                setWishlist(res.data.wishlist);
            } else if (res.data.status === 401) {
                swal('Thông báo', res.data.message, 'error');
            }
            setLoading(false);
        });
    }, []);

    const onRemoveProduct = (product_id) => {
        axios.delete(`/api/delete-wishlist/${product_id}`).then(res => {
            if (res.data.status === 200) {
                swal('Thông báo', res.data.message, 'success');
                const newWishlist = wishlist.filter(item => item.product.id !== product_id)
                setWishlist(newWishlist);
            } else if (res.data.status === 404) {
                swal('Thông báo', res.data.message, 'error');
            } else if (res.data.status === 401) {
                swal('Thông báo', res.data.message, 'error');
            }
        })
    };

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
                    <h2 className="title">Danh sách sản phẩm yêu thích</h2>

                    <ul className="breadcrumb" style={{ display: 'contents' }}>
                        <li><Link to="/" title="Home">Trang chủ</Link></li>
                        <li><span>Sản phẩm yêu thích</span></li>
                    </ul>
                </div>
            </div>

            <div className="container">
                {
                    wishlist.length === 0 ?
                        <h2 className="title text-center">Chưa có sản phẩm nào trong danh sách</h2> :
                        <div className="page-cart">
                            <div className="table-responsive">
                                <table className="cart-summary table table-bordered">
                                    <thead>
                                        <tr>
                                            <th className="width-20">&nbsp;</th>
                                            <th className="width-80 text-center">Ảnh sản phẩm</th>
                                            <th>Tên sản phẩm</th>
                                            <th className="width-100 text-center">Giá tiền</th>
                                            <th className="width-100 text-center">Tình trạng</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {
                                            wishlist.map(item => (
                                                <tr key={item.id}>
                                                    <td className="product-remove">
                                                        <a title="Remove this item" className="remove" onClick={() => onRemoveProduct(item.product.id)}>
                                                            <i className="fa fa-times"></i>
                                                        </a>
                                                    </td>
                                                    <td>
                                                        <Link to={`/product-detail/${item.product.slug}`}>
                                                            <img alt={item.product.name} className="img-responsive" src={CONFIG.BASE_URL + `${item.product.image}`} />
                                                        </Link>
                                                    </td>
                                                    <td>
                                                        <Link to={`/product-detail/${item.product.slug}`} className="product-name">{item.product.name}</Link>
                                                    </td>
                                                    <td className="text-center">
                                                        {CONFIG.CONVERT_TO_VND(item.product.selling_price)}
                                                    </td>
                                                    <td className="text-center">
                                                        {item.product.status === 0 ? <label className="text-green">Còn hàng</label> : <label className="text-red">Hết hàng</label>}
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>

                            <div className="home-btn">
                                <Link to="/" className="btn btn-primary pull-left" title="Back to home">
                                    <i className="fa fa-angle-left ml-xs"></i>
                                    <span>Trang chủ</span>
                                </Link>
                            </div>
                        </div>
                }
            </div>
        </div>
    );
}

export default Wishlist;