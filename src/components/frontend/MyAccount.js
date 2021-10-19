import React from "react";
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import swal from 'sweetalert';
import axios from 'axios';

function MyAccount() {

    const history = useHistory();

    if (!localStorage.getItem('auth_token')) {
        history.push('/user-login');
        swal('Warning', 'Bạn phải đăng nhập để thực hiện chức năng này', 'error');
    }

    const [loading, setLoading] = useState(true);
    const [defaultAddress, setDefaultAddress] = useState({
        name: '',
        city: '',
        phone_number: '',
        address: ''
    });

    const [accountInput, setAccountInput] = useState({
        old_password: '',
        new_password: '',
        re_new_password: ''
    });

    const [province, setProvince] = useState([]);
    const [addressInput, setAddressInput] = useState({
        name: '',
        city: '',
        phone_number: '',
        address: ''
    });

    const [errors, setErrors] = useState([]);
    const [errorsAddress, setErrorsAddress] = useState([]);

    const handleInput = (e) => {
        e.persist();
        setAccountInput({ ...accountInput, [e.target.name]: e.target.value });
    }

    const handleAddressInput = (e) => {
        e.persist();
        setAddressInput({ ...addressInput, [e.target.name]: e.target.value });
    }

    useEffect(() => {
        getProvince();

        axios.get('/api/get-default-address').then(res => {
            if (res.data.status === 200) {
                setDefaultAddress(res.data.address === null ? {} : res.data.address);
            }
            setLoading(false);
        })
    }, []);

    async function getProvince() {
        let result = await fetch('https://provinces.open-api.vn/api/?depth=2');
        result = await result.json();
        setProvince(result);
    }

    const submitChangePassword = (e) => {
        e.preventDefault();

        const data = {
            old_password: accountInput.old_password,
            new_password: accountInput.new_password,
            re_new_password: accountInput.re_new_password
        }

        axios.post('/api/change-password', data).then(res => {
            if (res.data.status === 200) {
                swal('Đổi mật khẩu thành công', res.data.message, 'success');
                setErrors([]);
                setAccountInput({
                    old_password: '',
                    new_password: '',
                    re_new_password: ''
                });
            } else if (res.data.status === 401) {
                swal('Có lỗi xảy ra, vui lòng thử lại', res.data.message, 'error');
            } else {
                setErrors(res.data.errors);
            }
        })
    }

    const submitAddress = (e) => {
        e.preventDefault();

        const data = {
            city: addressInput.city,
            name: addressInput.name,
            phone_number: addressInput.phone_number,
            address: addressInput.address
        }

        axios.post('/api/store-address', data).then(res => {
            if (res.data.status === 200) {
                swal('Thông báo', res.data.message, 'success');
                setErrorsAddress([]);
                setAddressInput({
                    city: '',
                    name: '',
                    phone_number: '',
                    address: ''
                });

                setDefaultAddress({
                    city: addressInput.city,
                    name: addressInput.name,
                    phone_number: addressInput.phone_number,
                    address: addressInput.address
                });
            } else if (res.data.status === 401) {
                swal('Có lỗi xảy ra, vui lòng thử lại', res.data.message, 'error');
            } else if (res.data.status === 403) {
                swal('Đã có lỗi xảy ra', res.data.message, 'error');
            } else {
                setErrorsAddress(res.data.errors);
            }
        })
    }

    const deleteAddress = (e, id) => {
        e.preventDefault();

        swal("Bạn có chắc muốn xoá địa chỉ giao hàng?", {
            buttons: {
                yes: {
                    text: "Yes",
                    value: "yes"
                },
                no: {
                    text: "No",
                    value: "no"
                }
            }
        }).then((value) => {
            if (value === "yes") {
                axios.delete(`/api/delete-address/${id}`).then(res => {
                    if (res.data.status === 200) {
                        swal('Thành công', res.data.message, 'success');
                        setDefaultAddress({
                            city: '',
                            name: '',
                            phone_number: '',
                            address: ''
                        });
                    } else if (res.data.status === 404) {
                        swal('Thất bại', res.data.message, 'error');
                    };
                });
            }
            return false;
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
        // <!-- Main Content -->
        <div id="content" className="site-content">
            {/* <!-- Breadcrumb --> */}
            <div id="breadcrumb">
                <div className="container">
                    <h2 className="title">Thiết lập tài khoản</h2>

                    <ul className="breadcrumb" style={{ display: 'contents' }}>
                        <li><Link to="/" title="Home">Trang chủ</Link></li>
                        <li><span>Tài khoản của tôi</span></li>
                    </ul>
                </div>
            </div>

            <div className="container">
                <div className="page-checkout">
                    <div className="row">
                        <div className="checkout-left col-lg-8 col-md-8 col-sm-8 col-xs-12 offset-lg-2">
                            <div className="panel-group" id="accordion">
                                <div className="panel panel-default">
                                    <div className="panel-heading">
                                        <h4 className="panel-title">
                                            <Link className="accordion-toggle collapsed" data-toggle="collapse" data-parent="#accordion" to="#collapseTwo">
                                                Đổi mật khẩu
                                            </Link>
                                        </h4>
                                    </div>

                                    <div id="collapseTwo" className="accordion-body collapse" style={{ height: '0' }}>
                                        <form onSubmit={submitChangePassword}>
                                            <div className="panel-body">
                                                <div className="form-group">
                                                    <div className="col-md-8 offset-md-2">
                                                        <label className="mt-4">Mật khẩu cũ</label>
                                                        <input type="password" name="old_password" onChange={handleInput} value={accountInput.old_password} className="form-control" required />
                                                        <large className="text-danger">{errors.old_password}</large>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <div className="col-md-8 offset-md-2">
                                                        <label className="mt-4">Mật khẩu mới</label>
                                                        <input type="password" name="new_password" onChange={handleInput} value={accountInput.new_password} className="form-control" required />
                                                        <large className="text-danger">{errors.new_password}</large>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <div className="col-md-8 offset-md-2">
                                                        <label className="mt-4">Nhập lại mật khẩu mới</label>
                                                        <input type="password" name="re_new_password" onChange={handleInput} value={accountInput.re_new_password} className="form-control" required />
                                                        <large className="text-danger">{errors.re_new_password}</large>
                                                    </div>
                                                </div>

                                                <div className="form-group text-center">
                                                    <button type="submit" className="btn btn-primary mt-4">Đổi mật khẩu</button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>

                                <div className="panel panel-default">
                                    <div className="panel-heading">
                                        <h4 className="panel-title">
                                            <Link className="accordion-toggle collapsed" data-toggle="collapse" data-parent="#accordion" to="#collapseThree">
                                                Thiết lập địa chỉ giao hàng
                                            </Link>
                                        </h4>
                                    </div>

                                    <div id="collapseThree" className="accordion-body collapse" style={{ height: '0' }}>
                                        <form onSubmit={submitAddress}>
                                            <div className="panel-body">
                                                <div className="form-group">
                                                    <div className="col-md-8 offset-md-2">
                                                        <label className="mt-4">Tỉnh/Thành phố</label>
                                                        <select name="city" onChange={handleAddressInput} value={addressInput.city} className="form-control" required>
                                                            <option value="">Chọn tỉnh/thành phố</option>
                                                            {
                                                                province.map(item => (
                                                                    <option key={item.code} value={item.name}>{item.name}</option>
                                                                ))
                                                            }
                                                        </select>
                                                        <large className="text-danger">{errorsAddress.city}</large>
                                                    </div>
                                                </div>

                                                <div className="form-group">
                                                    <div className="col-md-8 offset-md-2">
                                                        <label className="mt-4">Tên người nhận</label>
                                                        <input type="text" name="name" onChange={handleAddressInput} value={addressInput.name} className="form-control" required />
                                                        <large className="text-danger">{errorsAddress.name}</large>
                                                    </div>
                                                </div>

                                                <div className="form-group">
                                                    <div className="col-md-8 offset-md-2">
                                                        <label className="mt-4">Số điện thoại người nhận</label>
                                                        <input type="text" name="phone_number" onChange={handleAddressInput} value={addressInput.phone_number} className="form-control" required />
                                                        <large className="text-danger">{errorsAddress.phone_number}</large>
                                                    </div>
                                                </div>

                                                <div className="form-group">
                                                    <div className="col-md-8 offset-md-2">
                                                        <label className="mt-4">Địa chỉ</label>
                                                        <input type="text" name="address" onChange={handleAddressInput} value={addressInput.address} className="form-control" required />
                                                        <large className="text-danger">{errorsAddress.address}</large>
                                                    </div>
                                                </div>

                                                <div className="form-group text-center">
                                                    <button type="submit" className="btn btn-primary mt-4">Lưu địa chỉ</button>
                                                </div>

                                                <table className="table cart-total">
                                                    <tbody>
                                                        <tr>
                                                            <th>
                                                                Tỉnh/Thành phố
                                                            </th>
                                                            <td>
                                                                {defaultAddress.city}
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <th>
                                                                Tên người nhận
                                                            </th>
                                                            <td>
                                                                {defaultAddress.name}
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <th>
                                                                Số điện thoại người nhận
                                                            </th>
                                                            <td>
                                                                {defaultAddress.phone_number}
                                                            </td>
                                                        </tr>

                                                        <tr>
                                                            <th>
                                                                Địa chỉ
                                                            </th>
                                                            <td>
                                                                {defaultAddress.address}
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>

                                                <div className="form-group text-center">
                                                    <button type="button" onClick={(e) => deleteAddress(e, defaultAddress.id)} className="btn btn-primary mt-4">Xoá địa chỉ</button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MyAccount;