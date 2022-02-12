import React, { useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import { Link } from "react-router-dom";

function Contact() {

    const [messageInput, setMessage] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });
    const [errors, setErrors] = useState([]);

    const handleInput = (e) => {
        e.persist();
        setMessage({ ...messageInput, [e.target.name]: e.target.value })
    }

    const submitMessage = (e) => {
        e.preventDefault();

        const data = {
            name: messageInput.name,
            email: messageInput.email,
            phone: messageInput.phone,
            message: messageInput.message
        }

        axios.post(`/api/store-message`, data).then(res => {
            if (res.data.status === 200) {
                swal('Thông báo', res.data.message, 'success');
                setMessage({
                    name: '',
                    email: '',
                    phone: '',
                    message: ''
                });
                setErrors([]);
            } else if (res.data.status === 422) {
                swal('Errors', '', 'error');
                setErrors(res.data.errors);
            }
        });
    }

    return (
        <div id="content" className="site-content">
            {/* <!-- Breadcrumb --> */}
            <div id="breadcrumb">
                <div className="container">
                    <h2 className="title">Liên hệ</h2>

                    <ul className="breadcrumb" style={{ display: 'contents' }}>
                        <li><Link to="/" title="Home">Trang chủ</Link></li>
                        <li><span>Liên hệ</span></li>
                    </ul>
                </div>
            </div>

            <div className="container">
                <div className="contact-page">
                    <div className="contact-info">
                        <div className="row">
                            <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                <div className="item d-flex">
                                    <div className="item-left">
                                        <div className="icon"><i className="zmdi zmdi-email"></i></div>
                                    </div>
                                    <div className="item-right d-flex">
                                        <div className="title">Email:</div>
                                        <div className="content">
                                            <a href="#">170501016@student.bdu.edu.vn</a><br />
                                            <a href="#">170501703@student.bdu.edu.vn</a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                <div className="item d-flex justify-content-center">
                                    <div className="item-left">
                                        <div className="icon"><i className="zmdi zmdi-home"></i></div>
                                    </div>
                                    <div className="item-right d-flex">
                                        <div className="title">Địa chỉ:</div>
                                        <div className="content">
                                            3 Lê Thị Riêng, Phường 5, Thành phố Cà Mau<br />
                                            Tỉnh Cà Mau, Việt Nam
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                <div className="item d-flex justify-content-end">
                                    <div className="item-left">
                                        <div className="icon"><i className="zmdi zmdi-phone"></i></div>
                                    </div>
                                    <div className="item-right d-flex">
                                        <div className="title">Holine:</div>
                                        <div className="content">
                                            0945-470-652<br />
                                            0929-356-454
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="contact-map">
                        <div id="map">
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3938.6546173551787!2d105.16468121409461!3d9.185594089047523!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a149b1fcaae087%3A0xd2eb5b48e3a6332!2zQsOsbmggRMawxqFuZyBVbml2ZXJzaXR5!5e0!3m2!1sen!2s!4v1643172828307!5m2!1sen!2s" width="1100" height="500" style={{ border: '0' }} allowFullScreen="" loading="lazy"></iframe>
                        </div>
                        <div className="hidden-lg hidden-md hidden-sm hidden-xs contact-address">3 Lê Thị Riêng, Phường 5, Thành phố Cà Mau, Cà Mau 970000</div>
                    </div>

                    <div className="contact-intro">
                        <p>“Hãy cho chúng tôi biết ý kiến của bạn”</p>
                        <img src="/assets/frontend/img/contact-icon.png" alt="Contact Comment" />
                    </div>

                    <div className="contact-form form">
                        <form onSubmit={submitMessage}>
                            <div className="form-group row">
                                <div className="col-md-6">
                                    <input type="text" onChange={handleInput} value={messageInput.name} name="name" placeholder="YOUR NAME" required />
                                    <small className="text-danger">{errors.name}</small>
                                </div>

                                <div className="col-md-6">
                                    <input type="text" onChange={handleInput} value={messageInput.phone} name="phone" placeholder="YOUR PHONE" required />
                                    <small className="text-danger">{errors.phone}</small>
                                </div>
                            </div>

                            <div className="form-group">
                                <input type="email" onChange={handleInput} value={messageInput.email} name="email" placeholder="YOUR EMAIL" required />
                                <small className="text-danger">{errors.email}</small>
                            </div>

                            <div className="form-group">
                                <textarea rows="10" onChange={handleInput} value={messageInput.message} name="message" placeholder="MESSAGE" required ></textarea>
                                <small className="text-danger">{errors.message}</small>
                            </div>

                            <div className="form-group text-center">
                                <input type="submit" className="btn btn-primary" value="Send Message" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact;