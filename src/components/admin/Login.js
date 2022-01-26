import axios from 'axios';
import React, { useState } from 'react';
import { Link, useHistory, Redirect } from 'react-router-dom';
import swal from 'sweetalert';

function Login() {

    const history = useHistory();
    const [loginInput, setLogin] = useState({
        email: '',
        password: '',
        errors: []
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

                    if (res.data.role === 'admin') {
                        history.push('/admin/dashboard');
                    } else {
                        history.push('/');
                    }
                } else if (res.data.status === 401) {
                    swal('Warning', res.data.message, 'warning');
                } else {
                    setErrors(res.data.errors);
                }
            });
        });
    };

    return (
        localStorage.getItem('auth_token') ?
        <Redirect to="/admin/dashboard" /> :
        (<div className="hold-transition login-page">
            <div className="login-box">
                <div className="login-logo">
                    <b>Admin</b> Login
                </div>

                <div className="card">
                    <div className="card-body login-card-body">
                        <p className="login-box-msg">Sign in to start your session</p>

                        <form onSubmit={loginSubmit}>
                            <div className="input-group2">
                                <input type="email" name="email" className="form-control" onChange={handleInput} value={loginInput.email} placeholder="Email" required />
                                <div className="input-group2-append">
                                    <div className="input-group2-text">
                                        <span className="fas fa-envelope"></span>
                                    </div>
                                </div>
                            </div>
                            <small className="text-danger">{errors.email}</small>
                            

                            <div className="input-group2 mt-3">
                                <input type="password" name="password" className="form-control" onChange={handleInput} value={loginInput.password} placeholder="Password" required />
                                <div className="input-group2-append">
                                    <div className="input-group2-text">
                                        <span className="fas fa-lock"></span>
                                    </div>
                                </div>
                            </div>
                            <small className="text-danger">{errors.password}</small>

                            <div className="row mt-3">
                                <div className="col-12">
                                    <button type="submit" className="btn2-lg btn2-primary2 btn2-block">Sign In</button>
                                </div>
                            </div>
                        </form>

                        <div className="social-auth-links text-center mb-3">
                            <p>- OR -</p>
                            <Link to="#" className="btn2-lg btn2-block btn2-primary2">
                                <i className="fab fa-facebook mr-2"></i> Sign in using Facebook
                            </Link>
                            <Link to="#" className="btn2-lg btn2-block btn2-danger2">
                                <i className="fab fa-google-plus mr-2"></i> Sign in using Google+
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>)
    );
}

export default Login;