import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
            {/* <!-- Brand Logo --> */}
            <a href="index3.html" className="brand-link">
                <img src="/assets/admin/dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{ opacity: '.8' }} />
                <span className="brand-text font-weight-light">AdminLTE 3</span>
            </a>

            {/* <!-- Sidebar --> */}
            <div className="sidebar">

                {/* <!-- SidebarSearch Form --> */}
                <div className="form-inline2">
                    <div className="input-group2" data-widget="sidebar-search">
                        <input className="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search" />
                        <div className="input-group2-append">
                            <button className="btn2 btn2-sidebar">
                                <i className="fas fa-search fa-fw"></i>
                            </button>
                        </div>
                    </div>
                </div>

                {/* <!-- Sidebar Menu --> */}
                <nav className="mt-2">
                    <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                        {/* <!-- Add icons to the links using the .nav-icon className with font-awesome or any other icon font library --> */}
                        <li className="nav-item">
                            <Link to="/admin/dashboard" className="nav-link">
                                <i className="nav-icon fas fa-tachometer-alt"></i>
                                <p>
                                    Dashboard
                                </p>
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link to="/admin/order-list" className="nav-link">
                                <i className="nav-icon fa fa-file-text"></i>
                                <p>
                                    Đơn đặt hàng
                                </p>
                            </Link>
                        </li>

                        <li className="nav-header">MANAGE SYSTEM</li>

                        <li className="nav-item">
                            <Link className="nav-link" to="#">
                                <i className="nav-icon far fa-image"></i>
                                <p>
                                    Slider
                                    <i className="fas fa-angle-left right"></i>
                                </p>
                            </Link>
                            <ul className="nav nav-treeview">
                                <li className="nav-item">
                                    <Link to="/admin/add-slider" className="nav-link">
                                        <i className="fas fa-plus nav-icon ml-3"></i>
                                        <p>Thêm Slider</p>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/admin/slider-list" className="nav-link">
                                        <i className="far fa-list-alt nav-icon ml-3"></i>
                                        <p>Danh sách Slider</p>
                                    </Link>
                                </li>
                            </ul>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="#">
                                <i className="nav-icon fas fa-chart-pie"></i>
                                <p>
                                    Loại sản phẩm
                                    <i className="right fas fa-angle-left"></i>
                                </p>
                            </Link>
                            <ul className="nav nav-treeview">
                                <li className="nav-item">
                                    <Link to="/admin/add-category" className="nav-link">
                                        <i className="fas fa-plus nav-icon ml-3"></i>
                                        <p>Thêm loại sản phẩm</p>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/admin/category-list" className="nav-link">
                                        <i className="far fa-list-alt nav-icon ml-3"></i>
                                        <p>Danh sách loại SP</p>
                                    </Link>
                                </li>
                            </ul>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="#">
                                <i className="nav-icon fas fa-tags"></i>
                                <p>
                                    Thương hiệu
                                    <i className="right fas fa-angle-left"></i>
                                </p>
                            </Link>
                            <ul className="nav nav-treeview">
                                <li className="nav-item">
                                    <Link to="/admin/add-brand" className="nav-link">
                                        <i className="fas fa-plus nav-icon ml-3"></i>
                                        <p>Thêm thương hiệu</p>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/admin/brand-list" className="nav-link">
                                        <i className="far fa-list-alt nav-icon ml-3"></i>
                                        <p>Danh sách thương hiệu</p>
                                    </Link>
                                </li>
                            </ul>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="#">
                                <i className="nav-icon fab fa-product-hunt"></i>
                                <p>
                                    Sản phẩm
                                    <i className="right fas fa-angle-left"></i>
                                </p>
                            </Link>
                            <ul className="nav nav-treeview">
                                <li className="nav-item">
                                    <Link to="/admin/add-product" className="nav-link">
                                        <i className="fas fa-plus nav-icon ml-3"></i>
                                        <p>Thêm sản phẩm</p>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/admin/product-list" className="nav-link">
                                        <i className="far fa-list-alt nav-icon ml-3"></i>
                                        <p>Danh sách sản phẩm</p>
                                    </Link>
                                </li>
                            </ul>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="#">
                                <i className="nav-icon fa fa-newspaper-o"></i>
                                <p>
                                    Tin tức
                                    <i className="right fas fa-angle-left"></i>
                                </p>
                            </Link>
                            <ul className="nav nav-treeview">
                                <li className="nav-item">
                                    <Link to="/admin/add-news" className="nav-link">
                                        <i className="fas fa-plus nav-icon ml-3"></i>
                                        <p>Thêm tin tức</p>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/admin/news-list" className="nav-link">
                                        <i className="far fa-list-alt nav-icon ml-3"></i>
                                        <p>Danh sách tin tức</p>
                                    </Link>
                                </li>
                            </ul>
                        </li>

                        <li className="nav-item">
                            <Link to="/admin/message-list" className="nav-link">
                                <i className="nav-icon far fa-comment-dots"></i>
                                <p>
                                    Ý kiến khách hàng
                                </p>
                            </Link>
                        </li>
                    </ul>
                </nav>
                {/* <!-- /.sidebar-menu --> */}
            </div>
            {/* <!-- /.sidebar --> */}
        </aside>
    );
}

export default Sidebar;