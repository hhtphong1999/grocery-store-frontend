import axios from 'axios';
import React, { useState } from 'react';
import { Link, useHistory, Redirect } from 'react-router-dom';
import swal from 'sweetalert';

function Login() {

    const history = useHistory();
    const [loginInput, setLogin] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState([]);

    const handleInput = (e) => {
        e.persist();
        setLogin({ ...loginInput, [e.target.name]: e.target.value });
    };

    const loginSubmit = (e) => {
        e.preventDefault();

        const data = {
            email: loginInput.email,
            password: loginInput.password
        };

        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post('api/login', data).then(res => {
                if (res.data.status === 200) {
                    localStorage.setItem('auth_token', res.data.token);
                    localStorage.setItem('auth_name', res.data.username);
                    swal('Success', res.data.message, 'success');
                    history.push('/');
                } else if (res.data.status === 401) {
                    swal('Error', res.data.message, 'error');
                } else {
                    setErrors(res.data.errors);
                }
            });
        });
    };

    return (
        localStorage.getItem('auth_token') ?
        <Redirect to="/" /> :
        (
            <div id="content" className="site-content">
                {/* <!-- Breadcrumb --> */}
                <div id="breadcrumb">
                    <div className="container">
                        <h2 className="title">Login</h2>

                        <ul className="breadcrumb" style={{ display: 'contents' }} >
                            <li><Link to="/" title="Home">Trang chủ</Link></li>
                            <li><span>Đăng nhập</span></li>
                        </ul>
                    </div>
                </div>


                <div className="container">
                    <div className="login-page">
                        <div className="login-form form">
                            <div className="block-title">
                                <h2 className="title"><span>Đăng nhập</span></h2>
                            </div>

                            <form onSubmit={loginSubmit}>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input type="email" onChange={handleInput} value={loginInput.email} placeholder="Nhập email của bạn" name="email" required />
                                    <small className="text-danger">{errors.email}</small>
                                </div>

                                <div className="form-group">
                                    <label>Password</label>
                                    <input type="password" onChange={handleInput} value={loginInput.password} placeholder="Nhập mật khẩu của bạn" name="password" required />
                                    <small className="text-danger">{errors.password}</small>
                                </div>

                                <div className="form-group text-center">
                                    <div className="link">
                                        <a href="#">Forgot your password?</a>
                                        &nbsp;
                                        <Link to="/user-register">Đăng ký?</Link>
                                    </div>
                                </div>

                                <div className="form-group text-center">
                                    <button type="submit" className="btn btn-primary">Đăng nhập</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    )
}

export default Login;