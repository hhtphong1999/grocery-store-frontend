import React, { useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import { Link } from 'react-router-dom';
import { useHistory, Redirect } from 'react-router';

function Register() {

    const history = useHistory();
    const [registerInput, setRegister] = useState({
        name: '',
        email: '',
        password: '',
        re_password: ''
    });
    const [errors, setErrors] = useState([]);

    const handleInput = (e) => {
        e.persist();
        setRegister({ ...registerInput, [e.target.name]: e.target.value })
    }

    const registerSubmit = (e) => {
        e.preventDefault();

        const data = {
            name: registerInput.name,
            email: registerInput.email,
            password: registerInput.password,
            re_password: registerInput.re_password
        }

        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post(`/api/register`, data).then(res => {
                if (res.data.status === 200) {
                    localStorage.setItem('auth_token', res.data.token);
                    localStorage.setItem('auth_name', res.data.username);
                    swal('Success', res.data.message, 'success');
                    history.push('/');
                } else {
                    swal('Errors', '', 'error');
                    setErrors(res.data.errors);
                }
            });
        });
    }

    return (
        localStorage.getItem('auth_token') ?
        <Redirect to="/" /> :
        (
            <div id="content" className="site-content">
                {/* <!-- Breadcrumb --> */}
                <div id="breadcrumb">
                    <div className="container">
                        <h2 className="title">Đăng ký tài khoản</h2>

                        <ul className="breadcrumb" style={{ display: 'contents' }}>
                            <li><Link to="/" title="Home">Trang chủ</Link></li>
                            <li><span>Đăng ký</span></li>
                        </ul>
                    </div>
                </div>


                <div className="container">
                    <div className="register-page">
                        <div className="register-form form">
                            <div className="block-title">
                                <h2 className="title"><span>Đăng ký</span></h2>
                            </div>

                            <form onSubmit={registerSubmit}>
                                <div className="form-group">
                                    <label>Họ tên</label>
                                    <input type="text" onChange={handleInput} value={registerInput.name} name="name" placeholder="Nhập tên của bạn" required />
                                    <small className="text-danger">{errors.name}</small>
                                </div>

                                <div className="form-group">
                                    <label>Email</label>
                                    <input type="email" onChange={handleInput} value={registerInput.email} name="email" placeholder="Nhập email của bạn" required />
                                    <small className="text-danger">{errors.email}</small>
                                </div>

                                <div className="form-group">
                                    <label>Mật khẩu</label>
                                    <input type="password" onChange={handleInput} value={registerInput.password} name="password" placeholder="Nhập mật khẩu" required />
                                    <small className="text-danger">{errors.password}</small>
                                </div>

                                <div className="form-group">
                                    <label>Nhập lại mật khẩu</label>
                                    <input type="password" onChange={handleInput} value={registerInput.re_password} name="re_password" placeholder="Nhập lại mật khẩu" required />
                                    <small className="text-danger">{errors.re_password}</small>
                                </div>

                                <div className="form-group text-center">
                                    <button type="submit" className="btn btn-primary">Tạo tài khoản</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    )
}

export default Register;