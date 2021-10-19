import React from "react";

import { Link } from "react-router-dom";

function AboutUs() {
    return (
        <div id="content" className="site-content">
            {/* <!-- Breadcrumb --> */}
            <div id="breadcrumb">
                <div className="container">
                    <h2 className="title">Giới thiệu</h2>

                    <ul className="breadcrumb" style={{ display: 'contents' }}>
                        <li><Link to="/" title="Home">Trang chủ</Link></li>
                        <li><span>Giới thiệu</span></li>
                    </ul>
                </div>
            </div>

            <div className="container">
                <div className="about-us intro">
                    <div className="container">
                        <div className="row">
                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                <div className="intro-header">
                                    <h3>Welcome To FreshMart</h3>
                                    <p>Chúng tôi mong muốn mang đến sự nhanh chóng và tiện lợi tối đa khi mua sắm đến cho khách hàng bằng việc đưa hệ thống siêu thị FreshMart phủ rộng khắp mọi khu vực kể cả vùng nông thôn. Bên cạnh đó, chúng tôi cũng tập trung phát triển kênh mua sắm online trên website của FreshMart để phục vụ cho mọi đối tượng, đặc biệt là nhóm khách hàng trẻ.</p>
                                </div>
                            </div>

                            <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                <div className="intro-left">
                                    <div className="intro-item">
                                        <p><img src="/assets/frontend/img/intro-icon-1.png" alt="Intro Image" /></p>
                                        <h4>Luôn luôn tươi mới</h4>
                                        <p>Sản phẩm luôn được bảo quản một cách tốt nhất trước khi đến tay khách hàng</p>
                                    </div>

                                    <div className="intro-item">
                                        <p><img src="/assets/frontend/img/intro-icon-3.png" alt="Intro Image" /></p>
                                        <h4>Bảo đảm sức khoẻ</h4>
                                        <p>Tất cả sản phẩm bán ra đều được trải qua quá trình kiểm tra nghiêm ngặt</p>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                <div className="effect">
                                    <a href="#">
                                        <img className="img-responsive" src="/assets/frontend/img/intro-1.png" alt="Intro Image" />
                                    </a>
                                </div>
                            </div>

                            <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                <div className="intro-right">
                                    <div className="intro-item">
                                        <p><img src="/assets/frontend/img/intro-icon-2.png" alt="Intro Image" /></p>
                                        <h4>100% tự nhiên</h4>
                                        <p>Bảo đảm không chứa chất bảo quản có hại cho sức khoẻ người tiêu dùng</p>
                                    </div>

                                    <div className="intro-item">
                                        <p><img src="/assets/frontend/img/intro-icon-4.png" alt="Intro Image" /></p>
                                        <h4>Chất lượng cao</h4>
                                        <p>Chất lượng sản phẩm luôn được đặt lên hàng đầu</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutUs;