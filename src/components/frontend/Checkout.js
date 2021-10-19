import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import swal from 'sweetalert';
import * as CONFIG from '../../constants/config';

function Checkout(props) {

    const history = useHistory();

    if (!localStorage.getItem('auth_token')) {
        history.push('/user-login');
        swal('Warning', 'Bạn phải đăng nhập để tiến hành đặt hàng', 'error');
    }

    const { cart, onDestroyCart } = props;
    const totalPrice = cart.reduce((a, c) => a + c.selling_price * c.qty, 0);
    const [province, setProvince] = useState([]);
    const [checkoutInput, setCheckoutInput] = useState({
        name: '',
        city: '',
        phone_number: '',
        address: '',
        note: ''
    });
    const [payment, setPayment] = useState('0');
    const [errors, setErrors] = useState([]);

    const [defaultAddress, setDefaultAddress] = useState({});

    useEffect(() => {
        getProvince();

        axios.get('/api/get-default-address').then(res => {
            if (res.data.status === 200) {
                setDefaultAddress(res.data.address);
            }
        })
    }, [history]);

    const handleInput = (e) => {
        e.persist();
        setCheckoutInput({ ...checkoutInput, [e.target.name]: e.target.value });
    }

    const handleCheckbox = (e) => {
        if (e.target.checked) {
            setCheckoutInput({
                name: defaultAddress.name,
                city: defaultAddress.city,
                phone_number: defaultAddress.phone_number,
                address: defaultAddress.address
            });
        } else {
            setCheckoutInput({
                name: '',
                city: '',
                phone_number: '',
                address: ''
            });
        }
    }

    async function getProvince() {
        let result = await fetch('https://provinces.open-api.vn/api/?depth=2');
        result = await result.json();
        setProvince(result);
    }

    const submitOrder = (e) => {
        e.preventDefault();

        const data = {
            name: checkoutInput.name,
            city: checkoutInput.city,
            phone_number: checkoutInput.phone_number,
            address: checkoutInput.address,
            note: checkoutInput.note,
            payment_type: payment,
            cart: cart,
            total_price: totalPrice
        }

        axios.post('/api/place-order', data).then(res => {
            if (res.data.status === 200) {
                swal('Đặt hàng thành công', res.data.message, 'success');
                setErrors([]);
                onDestroyCart();
                history.push('/my-order');
            } else if (res.data.status === 422) {
                swal('Có lỗi xảy ra, vui lòng thử lại', '', 'error');
                setErrors(res.data.errors);
            }
        })
    }

    return (
        // <!-- Main Content -->
        <div id="content" className="site-content">
            {/* <!-- Breadcrumb --> */}
            <div id="breadcrumb">
                <div className="container">
                    <h2 className="title">Thanh toán</h2>

                    <ul className="breadcrumb" style={{ display: 'contents' }}>
                        <li><Link to="/" title="Home">Trang chủ</Link></li>
                        <li><span>Thanh toán</span></li>
                    </ul>
                </div>
            </div>

            <div className="container">
                <div className="page-checkout">
                    <div className="row">
                        <div className="checkout-left col-lg-9 col-md-9 col-sm-9 col-xs-12">
                            <form onSubmit={submitOrder}>
                                <div className="panel-group" id="accordion">
                                    <div className="panel panel-default">
                                        <div className="panel-heading">
                                            <h4 className="panel-title">
                                                <Link className="accordion-toggle collapsed" data-toggle="collapse" data-parent="#accordion" to="#collapseTwo">
                                                    Địa chỉ nhận hàng
                                                </Link>
                                            </h4>
                                        </div>
                                        <div id="collapseTwo" className="accordion-body collapse" style={{ height: '0' }}>
                                            <div className="panel-body">
                                                <div className="item">
                                                    <input className="mr-2" name="default_address" onChange={handleCheckbox} type="checkbox" />Chọn địa chỉ giao hàng mặc định
                                                </div>
                                                <div className="form-group">
                                                    <div className="col-md-12">
                                                        <label className="mt-4">Tỉnh/Thành phố</label>
                                                        <select name="city" onChange={handleInput} value={checkoutInput.city} className="form-control" required>
                                                            <option value="">Chọn tỉnh/thành phố</option>
                                                            {
                                                                province.map(item => (
                                                                    <option key={item.code} value={item.name}>{item.name}</option>
                                                                ))
                                                            }
                                                        </select>
                                                        <large className="text-danger">{errors.city}</large>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <div className="col-md-12">
                                                        <label className="mt-4">Tên người nhận</label>
                                                        <input type="text" name="name" onChange={handleInput} value={checkoutInput.name} className="form-control" required />
                                                        <large className="text-danger">{errors.name}</large>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <div className="col-md-12">
                                                        <label className="mt-4">Số điện thoại người nhận</label>
                                                        <input type="text" name="phone_number" onChange={handleInput} value={checkoutInput.phone_number} className="form-control" required />
                                                        <large className="text-danger">{errors.phone_number}</large>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <div className="col-md-12">
                                                        <label className="mt-4">Địa chỉ</label>
                                                        <input type="text" name="address" onChange={handleInput} value={checkoutInput.address} className="form-control" required />
                                                        <large className="text-danger">{errors.address}</large>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <div className="col-md-12">
                                                        <label className="mt-4">Ghi chú</label>
                                                        <input type="text" name="note" onChange={handleInput} value={checkoutInput.note} className="form-control" />
                                                        <large className="text-danger">{errors.note}</large>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="panel panel-default">
                                        <div className="panel-heading">
                                            <h4 className="panel-title">
                                                <Link className="accordion-toggle collapsed" data-toggle="collapse" data-parent="#accordion" to="#collapseThree">
                                                    Phương thức thanh toán
                                                </Link>
                                            </h4>
                                        </div>
                                        <div id="collapseThree" className="accordion-body collapse" style={{ height: '0' }}>
                                            <div className="panel-body">
                                                <table className="cart-summary table table-bordered">
                                                    <thead>
                                                        <tr>
                                                            <th className="width-80 text-center">Ảnh sản phẩm</th>
                                                            <th>Tên sản phẩm</th>
                                                            <th className="width-100 text-center">Đơn giá</th>
                                                            <th className="width-100 text-center">Số lượng</th>
                                                            <th className="width-100 text-center">Tổng</th>
                                                        </tr>
                                                    </thead>

                                                    <tbody>
                                                        {
                                                            cart.map(item => (
                                                                <tr key={item.id}>
                                                                    <td>
                                                                        <Link to={`/product-detail/${item.slug}`}>
                                                                            <img width="80" alt={item.name} className="img-responsive" src={CONFIG.BASE_URL + `${item.image}`} />
                                                                        </Link>
                                                                    </td>
                                                                    <td>
                                                                        <Link to={`/product-detail/${item.slug}`} className="product-name">{item.name}</Link>
                                                                    </td>
                                                                    <td className="text-center">{CONFIG.CONVERT_TO_VND(item.selling_price)}</td>
                                                                    <td className="text-center">{item.qty}</td>
                                                                    <td className="text-center">{CONFIG.CONVERT_TO_VND(item.selling_price * item.qty)}</td>
                                                                </tr>
                                                            ))
                                                        }
                                                    </tbody>
                                                </table>

                                                <h4 className="heading-primary">Tổng</h4>
                                                <table className="table cart-total">
                                                    <tbody>
                                                        <tr>
                                                            <th>
                                                                Tạm tính
                                                            </th>
                                                            <td className="total">
                                                                {CONFIG.CONVERT_TO_VND(totalPrice)}
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <th>
                                                                Phí vận chuyển
                                                            </th>
                                                            <td>
                                                                Miễn phí
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <th>
                                                                <strong>Tổng tiền</strong>
                                                            </th>
                                                            <td className="total">
                                                                {CONFIG.CONVERT_TO_VND(totalPrice)}
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>

                                                <h4 className="heading-primary">Chọn phương thức thanh toán</h4>
                                                <div className="form-check" required>
                                                    <div className="item">
                                                        <input className="mr-2" name="payment" checked={payment === "0"} value="0" onChange={(e) => { setPayment(e.target.value) }} type="radio" defaultChecked />Thanh toán khi nhận hàng
                                                    </div>
                                                    <div className="item">
                                                        <input className="mr-2" name="payment" checked={payment === "1"} value="1" onChange={(e) => { setPayment(e.target.value) }} type="radio" />Thanh toán qua ví Momo (chuyển đến ví Momo - 0944.987.333 - Huỳnh Thanh Phong kèm nội dung là SĐT người nhận)
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="pull-left">
                                    <Link className="btn btn-primary" to="/product-cart">Giỏ hàng</Link>
                                </div>

                                <div className="pull-right">
                                    <button type="submit" className="btn btn-primary">Đặt hàng</button>
                                </div>
                            </form>
                        </div>

                        <div className="checkout-right col-lg-3 col-md-3 col-sm-3 col-xs-12">
                            <h4 className="title">Tổng</h4>
                            <table className="table cart-total">
                                <tbody>
                                    <tr className="cart-subtotal">
                                        <th>
                                            <strong>Tạm tính</strong>
                                        </th>
                                        <td>
                                            <strong><span className="amount">{CONFIG.CONVERT_TO_VND(totalPrice)}</span></strong>
                                        </td>
                                    </tr>
                                    <tr className="shipping">
                                        <th>Phí vận chuyển</th>
                                        <td>
                                            Miễn phí<input type="hidden" value="free_shipping" className="shipping-method" name="shipping_method" />
                                        </td>
                                    </tr>
                                    <tr className="total">
                                        <th>
                                            <strong>Tổng tiền</strong>
                                        </th>
                                        <td>
                                            <strong><span className="amount">{CONFIG.CONVERT_TO_VND(totalPrice)}</span></strong>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Checkout;