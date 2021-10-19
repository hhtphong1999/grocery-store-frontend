import React from "react";
import { Link } from "react-router-dom";
import * as CONFIG from '../../constants/config';

function Cart(props) {

    const { cart, onIncreaseProduct, onDecreaseProduct, onRemoveProduct } = props;
    const totalPrice = cart.reduce((a, c) => a + c.selling_price * c.qty, 0);

    return (
        <div id="content" className="site-content">
            {/* <!-- Breadcrumb --> */}
            <div id="breadcrumb">
                <div className="container">
                    <h2 className="title">Giỏ hàng</h2>

                    <ul className="breadcrumb" style={{ display: 'contents' }}>
                        <li><Link to="/" title="Home">Trang chủ</Link></li>
                        <li><span>Giỏ hàng</span></li>
                    </ul>
                </div>
            </div>

            <div className="container">
                {
                    cart.length === 0 ?
                        <h2 className="title text-center">Chưa có sản phẩm nào trong giỏ</h2> :
                        <div className="page-cart">
                            <div className="table-responsive">
                                <table className="cart-summary table table-bordered">
                                    <thead>
                                        <tr>
                                            <th className="width-20">&nbsp;</th>
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
                                                    <td className="product-remove">
                                                        <a title="Remove this item" className="remove" onClick={() => onRemoveProduct(item)}>
                                                            <i className="fa fa-times"></i>
                                                        </a>
                                                    </td>
                                                    <td>
                                                        <Link to={`/product-detail/${item.slug}`}>
                                                            <img width="200" alt={item.name} className="img-responsive" src={CONFIG.BASE_URL+`${item.image}`} />
                                                        </Link>
                                                    </td>
                                                    <td>
                                                        <Link to={`/product-detail/${item.slug}`} className="product-name">{item.name}</Link>
                                                    </td>
                                                    <td className="text-center">
                                                        {CONFIG.CONVERT_TO_VND(item.selling_price)}
                                                    </td>
                                                    <td>
                                                        <div className="product-quantity">
                                                            <div className="qty">
                                                                <div className="input-group">
                                                                    <input type="text" name="qty" value={item.qty} data-min="1" data-max="10" />
                                                                    <span className="adjust-qty">
                                                                        <button className="adjust-btn plus" onClick={() => onIncreaseProduct(item)} >+</button>
                                                                        <button className="adjust-btn minus" onClick={() => onDecreaseProduct(item)} >-</button>
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="text-center">
                                                        {CONFIG.CONVERT_TO_VND(item.selling_price * item.qty)}
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>

                                    <tfoot>
                                        <tr className="cart-total">
                                            <td rowspan="3" colspan="3"></td>
                                            <td colspan="2" className="total text-right">Total</td>
                                            <td colspan="1" className="total text-center">{CONFIG.CONVERT_TO_VND(totalPrice)}</td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>

                            <div className="home-btn">
                                <Link to="/" className="btn btn-primary pull-left" title="Proceed to checkout">
                                    <i className="fa fa-angle-left ml-xs"></i>
                                    <span>Trang chủ</span>
                                </Link>
                            </div>

                            <div className="checkout-btn">
                                <Link to="/product-checkout" className="btn btn-primary pull-right" title="Proceed to checkout">
                                    <span>Thanh toán</span>
                                    <i className="fa fa-angle-right ml-xs"></i>
                                </Link>
                            </div>
                        </div>
                }
            </div>
        </div>
    );
}

export default Cart;