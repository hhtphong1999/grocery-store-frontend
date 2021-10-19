import axios from "axios";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import * as CONFIG from '../../constants/config';

function OrderDetail(props) {

    const history = useHistory();
    const [orderDetail, setOrderDetail] = useState([]);
    const [loading, setLoading] = useState(true);
    const totalPrice = orderDetail.reduce((a, c) => a + c.qty * c.price, 0);
    const totalProduct = orderDetail.reduce((a, c) => a + c.qty, 0);

    useEffect(() => {
        const id = props.match.params.id;

        axios.get(`/api/my-order-detail/${id}`).then(res => {
            if (res.status === 200) {
                if (res.data.status === 200) {
                    setOrderDetail(res.data.orderDetails);
                } else if (res.data.status === 401) {
                    history.push('/user-login');
                    swal('Thông báo', res.data.message, 'warning');
                } else if (res.data.status === 404) {
                    history.push('/my-order');
                    swal('Thông báo', res.data.message, 'warning');
                }
            }
            setLoading(false);
        })
    }, [props.match.params.id, history])

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
                    <h2 className="title">Chi tiết đơn hàng</h2>

                    <ul className="breadcrumb" style={{ display: 'contents' }}>
                        <li><Link to="/my-order" title="Home">Đơn hàng đã đặt</Link></li>
                        <li><span>Chi tiết đơn hàng</span></li>
                    </ul>
                </div>
            </div>

            <div className="container">
                <div className="page-cart">
                    <div className="table-responsive">
                        <table className="cart-summary table table-bordered">
                            <thead>
                                <tr>
                                    <th className="width-80 text-center">Tên sản phẩm</th>
                                    <th className="width-80 text-center">Ảnh</th>
                                    <th className="width-80 text-center">Số lượng</th>
                                    <th className="width-100 text-center">Đơn giá</th>
                                    <th className="width-100 text-center">Tổng</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    orderDetail.map(item => (
                                        <tr key={item.id}>
                                            <td className="text-center">
                                                <Link to={`/product-detail/${item.product.slug}`} className="product-name">{item.product.name}</Link>
                                            </td>
                                            <td className="d-flex justify-content-center">
                                                <Link to={`/product-detail/${item.product.slug}`}>
                                                    <img width="100" alt={item.product.name} className="img-responsive" src={CONFIG.BASE_URL + `${item.product.image}`} />
                                                </Link>
                                            </td>
                                            <td className="text-center">
                                                {item.qty}
                                            </td>
                                            <td className="text-center">
                                                {CONFIG.CONVERT_TO_VND(item.price)}
                                            </td>
                                            <td className="text-center">
                                                {CONFIG.CONVERT_TO_VND(item.price * item.qty)}
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>

                            <tfoot>
                                <tr className="cart-total">
                                    <td rowspan="2" colspan="3"></td>
                                    <td colspan="1" className="total text-right text-bold">Tổng sản phẩm</td>
                                    <td colspan="1" className="total text-center text-bold">{totalProduct}</td>
                                </tr>
                                <tr className="cart-total">
                                    <td colspan="1" className="total text-right text-bold">Tổng tiền</td>
                                    <td colspan="1" className="total text-center text-bold">{CONFIG.CONVERT_TO_VND(totalPrice)}</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>

                    <div className="checkout-btn">
                        <Link to="/my-order" className="btn btn-primary pull-left" title="Back">
                            <i className="fa fa-angle-left ml-xs"></i>
                            <span>Back</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderDetail;