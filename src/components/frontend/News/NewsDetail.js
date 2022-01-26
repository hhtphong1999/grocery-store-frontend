import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import swal from "sweetalert";
import * as CONFIG from '../../../constants/config';

import Category from "./Category";

function NewsDetail(props) {

    const history = useHistory();
    const [news, setNews] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const slug = props.match.params.slug;

        axios.get(`/api/get-news-detail/${slug}`).then(res => {
            if (res.data.status === 200) {
                setNews(res.data.news);
            } else if (res.data.status === 404) {
                swal('Error', res.data.message, 'error');
                history.push('/');
            }
            setLoading(false);
        })
    }, [props.match.params.slug, history]);

    console.log(typeof (new Date()));

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
        <div id="content" className="site-content">
            {/* <!-- Breadcrumb --> */}
            <div id="breadcrumb">
                <div className="container">
                    <h2 className="title">Tin tức</h2>

                    <ul className="breadcrumb" style={{ display: 'contents' }}>
                        <li><Link to="/" title="Home">Trang chủ</Link></li>
                        <li><Link to="/news" title="News">Tin tức</Link></li>
                        <li><span>{news.title}</span></li>
                    </ul>
                </div>
            </div>


            <div className="container">
                <div className="row">
                    {/* <!-- Sidebar --> */}
                    <div id="left-column" className="sidebar col-lg-3 col-md-3 col-sm-3 col-xs-12">
                        {/* <!-- Block - Product Categories --> */}
                        <div className="block product-categories">
                            <h3 className="block-title">Loại sản phẩm</h3>

                            <div className="block-content">
                                <Category />
                            </div>
                        </div>

                        {/* <!-- Block - Banner --> */}
                        <div className="block banner">
                            <div className="block-content">
                                <div className="effect">
                                    <img className="img-responsive" src="/assets/frontend/img/blog-banner.jpg" alt="Banner" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <!-- Page Content --> */}
                    <div id="center-column" className="col-lg-9 col-md-9 col-sm-9 col-xs-12">
                        <div className="blog-detail">
                            <div className="post-item">
                                <div className="post-image">
                                    <img className="img-responsive" src={CONFIG.BASE_URL + `${news.thumbnail}`} alt="Blog" />
                                </div>

                                <h1 className="post-title">{news.title}</h1>
                                <div className="post-content border-bottom">
                                    <section
                                        className="not-found-controller"
                                        dangerouslySetInnerHTML={{ __html: news.body }}
                                    />

                                {
                                    news.view_360 !== null ?
                                    news.view_360 !== '' ?
                                    <iframe src={`${news.view_360}`} width="800" height="600" style={{ border: '0' }} allowFullScreen="" loading="lazy"></iframe> :
                                    '':
                                    ''
                                }
                                </div>

                                <div className="post-meta border-bottom">
                                    <div className="post-info">
                                        <span className="date item"><i className="zmdi zmdi-calendar-note"></i>{CONFIG.CONVERT_DATETIME(news.created_at)}</span>
                                        <span className="author item"><i className="zmdi zmdi-account"></i>{news.user.name}</span>
                                    </div>
                                </div>

                                <div className="clear"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NewsDetail;