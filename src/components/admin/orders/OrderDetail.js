import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import * as CONFIG from '../../../constants/config';

function OrderDetail(props) {

    const history = useHistory();
    const [orderDetail, setOrderDetail] = useState([]);
    const [orderStatus, setOrderStatus] = useState([]);
    const [order, setOrder] = useState({
        payment_status: '',
        order_status: '',
        payment_type: ''
    });
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState([]);
    const totalPrice = orderDetail.reduce((a, c) => a + c.qty * c.price, 0);
    const totalProduct = orderDetail.reduce((a, c) => a + c.qty, 0);

    const handleInput = (e) => {
        e.persist();
        setOrder({ ...order, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        const order_id = props.match.params.id;

        axios.get(`api/get-order-status`).then(res => {
            if (res.data.status === 200) {
                setOrderStatus(res.data.orderStatus);
            }
        });

        axios.get(`api/order-detail/${order_id}`).then(res => {
            if (res.data.status === 200) {
                setOrderDetail(res.data.orderDetails);
                setOrder(res.data.orderDetails[0].order);
            } else if (res.data.status === 404) {
                swal('Thông báo', res.data.message, 'warning').then(history.push('/admin/order-list'));
            }
            setLoading(false);
        });
    }, [history, props.match.params.id])

    const updateOrder = (e) => {
        e.preventDefault();

        const order_id = props.match.params.id;
        const formData = new FormData();
        formData.append('payment_status', order.payment_status);
        formData.append('order_status', order.order_status);

        axios.post(`api/update-order/${order_id}`, formData).then(res => {
            if (res.data.status === 200) {
                swal('Success', res.data.message, 'success');
                setErrors([]);
            } else if (res.data.status === 422) {
                swal('Errors', '', 'error');
                setErrors(res.data.errors);
            } else if (res.data.status === 404) {
                swal('Error', res.data.message, 'error');
                history.push('/admin/order-list');
            } else if (res.data.status === 500) { }
        });
    }

    if (loading) {
        return <h4>Loading...</h4>;
    }

    return (
        <div>
            {/* <!-- Content Header (Page header) --> */}
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>Chi tiết đơn hàng</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><Link to="/admin/dashboard">Dashboard</Link></li>
                                <li className="breadcrumb-item active">Chi tiết đơn hàng</li>
                            </ol>
                        </div>
                    </div>
                </div>
                {/* <!-- /.container-fluid --> */}
            </section>

            <section className="content">
                <div className="container-fluid">
                    <div className="card card-primary">
                        <div className="card-header">
                            <h3 className="card-title text-xl">Cập nhật đơn hàng</h3>
                        </div>

                        <form onSubmit={updateOrder}>
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table table-bordered table-striped">
                                        <thead>
                                            <tr>
                                                <th className="text-center">Tên sản phẩm</th>
                                                <th className="text-center">Ảnh sản phẩm</th>
                                                <th className="text-center">Số lượng</th>
                                                <th className="text-center">Đơn giá</th>
                                                <th className="text-center">Tổng</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {
                                                orderDetail.map(item => (
                                                    <tr key={item.id}>
                                                        <td className="text-center">
                                                            <Link to='#' className="product-name">{item.product.name}</Link>
                                                        </td>
                                                        <td className="d-flex justify-content-center">
                                                            <Link to='#'>
                                                                <img width="75" alt={item.product.name} className="img-responsive" src={CONFIG.BASE_URL + `${item.product.image}`} />
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
                                                <td rowspan="6" colspan="3"></td>
                                                <td colspan="1" className="total text-right text-bold">Tổng sản phẩm</td>
                                                <td colspan="1" className="total text-center text-bold">{totalProduct}</td>
                                            </tr>
                                            <tr className="cart-total">
                                                <td colspan="1" className="total text-right text-bold">Tổng tiền</td>
                                                <td colspan="1" className="total text-center text-bold">{CONFIG.CONVERT_TO_VND(totalPrice)}</td>
                                            </tr>
                                            <tr className="cart-total">
                                                <td colspan="1" className="total text-right text-bold">Địa chỉ</td>
                                                <td colspan="1" className="total text-center text-bold">{order.address}, {order.city}</td>
                                            </tr>
                                            <tr className="cart-total">
                                                <td colspan="1" className="total text-right text-bold">Điện thoại</td>
                                                <td colspan="1" className="total text-center text-bold">{order.phone_number}</td>
                                            </tr>
                                            <tr className="cart-total">
                                                <td colspan="1" className="total text-right text-bold">Hình thức thanh toán</td>
                                                <td colspan="1" className="total text-center text-bold">{order.payment_type}</td>
                                            </tr>
                                            <tr className="cart-total">
                                                <td colspan="1" className="total text-right text-bold">Ghi chú</td>
                                                <td colspan="1" className="total text-center text-bold">{order.note}</td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                            </div>

                            <div className="row p-3">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Tình trạng đơn hàng</label>
                                        <select name="order_status" onChange={handleInput} value={order.order_status} className="form-control" required >
                                            {
                                                orderStatus.map((item) => {
                                                    return (<option value={item.id} key={item.id} >{item.name}</option>);
                                                })
                                            }
                                        </select>
                                        <small className="text-danger">{errors.order_status}</small>
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Trạng thái thanh toán</label>
                                        <select name="payment_status" onChange={handleInput} value={order.payment_status} className="form-control" required >
                                            <option value='Chưa thanh toán'>Chưa thanh toán</option>
                                            <option value='Đã thanh toán'>Đã thanh toán</option>
                                        </select>
                                        <small className="text-danger">{errors.payment_status}</small>
                                    </div>
                                </div>
                            </div>

                            <div className="card-footer">
                                <Link to="/admin/order-list" className="btn2 btn2-lg btn2-primary2 mr-3"><span>Trở lại</span></Link>
                                <button type="submit" className="btn2 btn2-lg btn2-primary2">Cập nhật</button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default OrderDetail;