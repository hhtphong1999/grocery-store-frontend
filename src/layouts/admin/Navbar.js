import axios from 'axios';
import React from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';

const Navbar = () => {

    const history = useHistory();
    
    const logoutSubmit = (e) => {
        e.preventDefault();

        axios.post('/api/logout').then(res => {
            if (res.data.status === 200) {
                localStorage.removeItem('auth_token');
                localStorage.removeItem('auth_name');
                swal('Success', res.data.message, 'success');
                history.push('/admin-login');
            }
        });
    }

    return (
        <nav className="main-header navbar navbar-expand navbar-white navbar-light">
            {/* <!-- Left navbar links --> */}
            <ul className="navbar-nav">
                <li className="nav-item">
                    <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i className="fas fa-bars"></i></a>
                </li>
                <li className="nav-item d-none d-sm-inline-block">
                    <Link to="/admin/dashboard" className="nav-link">Home</Link>
                </li>
                <li className="nav-item d-none d-sm-inline-block">
                    <a href="#" className="nav-link">Contact</a>
                </li>
            </ul>

            {/* <!-- Right navbar links --> */}
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link className="nav-link" data-widget="fullscreen" to="#" role="button">
                        <i className="fas fa-expand-arrows-alt"></i>
                    </Link>
                </li>

                <li className="nav-item dropdown">
                    <Link className="nav-link" data-toggle="dropdown" to="#">
                        <i className="fas fa-user fa-fw"></i>
                        <i className="fas fa-angle-down"></i>
                    </Link>
                    <div className="dropdown-menu dropdown-menu-right">
                        <Link to="#" className="dropdown-item text-center">
                            Settings
                        </Link>
                        <div className="dropdown-divider"></div>
                        <Link to="#" onClick={logoutSubmit} className="dropdown-item text-center">
                            Logout
                        </Link>
                    </div>               
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;