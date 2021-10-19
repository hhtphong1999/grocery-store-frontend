import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import swal from "sweetalert";
import * as CONFIG from '../../constants/config';

function MyOrder() {

    const history = useHistory();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('/api/my-order').then(res => {
            if (res.status === 200) {
                if (res.data.status === 401) {
                    swal('Thông báo', res.data.message, 'warning');
                    history.push('/user-login');
                }
                setOrders(res.data.orders);
            }
            setLoading(false);
        })
    }, [history]);

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
                    <h2 className="title">Đơn hàng của bạn</h2>

                    <ul className="breadcrumb" style={{ display: 'contents' }}>
                        <li><Link to="/" title="Home">Trang chủ</Link></li>
                        <li><span>Đơn hàng đã đặt</span></li>
                    </ul>
                </div>
            </div>

            <div className="container">
                {
                    orders.length === 0 ?
                        <h2 className="title text-center">Bạn chưa có đơn đặt hàng nào</h2> :
                        <div className="page-cart">
                            <div className="table-responsive">
                                <table className="cart-summary table table-bordered">
                                    <thead>
                                        <tr>
                                            <th className="width-20">&nbsp;</th>
                                            <th className="width-80 text-center">Ngày đặt hàng</th>
                                            <th className="width-80 text-center">Địa chỉ</th>
                                            <th className="width-80 text-center">Số điện thoại</th>
                                            <th className="width-100 text-center">Phương thức thanh toán</th>
                                            <th className="width-100 text-center">Trạng thái thanh toán</th>
                                            <th className="width-100 text-center">Tình trạng đơn hàng</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {
                                            orders.map(item => (
                                                <tr key={item.id}>
                                                    <td className="text-center">
                                                        <Link to={`/order-detail/${item.id}`}>Chi tiết</Link>
                                                    </td>
                                                    <td className="text-center">
                                                        {CONFIG.CONVERT_DATETIME(item.created_at)}
                                                    </td>
                                                    <td className="text-center">
                                                        {item.address} <br />
                                                        {item.city}
                                                    </td>
                                                    <td className="text-center">
                                                        {item.phone_number}
                                                    </td>
                                                    <td className="text-center">
                                                        {item.payment_type}
                                                    </td>
                                                    <td className="text-center">
                                                        {item.payment_status}
                                                    </td>
                                                    <td className="text-center">
                                                        {item.order_status.name}
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>

                            <div className="checkout-btn">
                                <Link to="/" className="btn btn-primary pull-left" title="Back">
                                    <i className="fa fa-angle-left ml-xs"></i>
                                    <span>Back</span>
                                </Link>
                            </div>
                        </div>
                }
            </div>
        </div>
    );
}

export default MyOrder;