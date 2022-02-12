import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
	return (
		<footer id="footer">
			<div className="footer">
				<div className="container">
					<div className="row">
						<div className="col-lg-3 col-md-3 col-sm-6 col-xs-12 footer-col">
							<div className="block text">
								<div className="block-content">
									<a href="home-2.html" className="logo-footer">
										<img src="/assets/frontend/img/logo-2.png" alt="Logo" />
									</a>

									<p>
										Cửa hàng chuyên bán lẻ thực phẩm (thịt, cá, rau củ,...) và nhu yếu phẩm chất lượng, nguồn gốc rõ ràng.<br />
										FreshMart chuyên cung cấp các sản phẩm đa dạng về chủng loại; giá cả hợp lý, nhân viên thân thiện, địa điểm dễ tiếp cận đối với người nội trợ..
									</p>
								</div>
							</div>

							<div className="block social">
								<div className="block-content">
									<ul>
										<li><Link to="#"><i className="zmdi zmdi-facebook"></i></Link></li>
										<li><Link to="#"><i className="zmdi zmdi-twitter"></i></Link></li>
										<li><Link to="#"><i className="zmdi zmdi-dribbble"></i></Link></li>
										<li><Link to="#"><i className="zmdi zmdi-instagram"></i></Link></li>
									</ul>
								</div>
							</div>
						</div>

						<div className="col-lg-3 col-md-3 col-sm-6 col-xs-12 footer-col">
							<div className="block menu">
								<h2 className="block-title">Thông tin</h2>

								<div className="block-content">
									<ul>
										<li><a href="#">Nổi bật</a></li>
										<li><a href="#">Sản phẩm mới</a></li>
										<li><a href="#">Sản phẩm bán chạy</a></li>
										<li><Link to="/about-us">Về chúng tôi</Link></li>
										<li><Link to="/contact">Liên hệ</Link></li>
									</ul>
								</div>
							</div>
						</div>

						<div className="col-lg-3 col-md-3 col-sm-6 col-xs-12 footer-col">
							<div className="block menu">
								<h2 className="block-title">Tài khoản</h2>

								<div className="block-content">
									<ul>
										<li><Link to="/my-order">Đơn đặt hàng</Link></li>
										<li><Link to="/my-account">Tài khoản</Link></li>
										<li><Link to="/my-wishlist">Sản phẩm yêu thích</Link></li>
										<li><Link to="/user-login">Đăng nhập</Link></li>
										<li><Link to="/user-register">Đăng ký</Link></li>
									</ul>
								</div>
							</div>
						</div>

						<div className="col-lg-3 col-md-3 col-sm-6 col-xs-12 footer-col">
							<div className="block text">
								<h2 className="block-title">Thông tin liên hệ</h2>

								<div className="block-content">
									<div className="contact">
										<div className="item d-flex">
											<div>
												<i className="zmdi zmdi-home"></i>
											</div>
											<div>
												<span>3 Lê Thị Riêng, Phường 5, Thành phố Cà Mau, Cà Mau 970000</span>
											</div>
										</div>
										<div className="item d-flex">
											<div>
												<i className="zmdi zmdi-phone-in-talk"></i>
											</div>
											<div>
												<span>0945-470-652<br />0929-356-454</span>
											</div>
										</div>
										<div className="item d-flex">
											<div>
												<i className="zmdi zmdi-email"></i>
											</div>
											<div>
												<span>170501016@student.bdu.edu.vn<br />170501703@student.bdu.edu.vn</span>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* <!-- Copyright --> */}
			<div className="footer-copyright text-center">
				<div className="container">
					<div className="payment">
						<img src="/assets/frontend/img/payment.png" alt="Payment" />
					</div>

					<div className="copyright"><a target="_blank" href="https://www.templateshub.net">Templates Hub</a></div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;