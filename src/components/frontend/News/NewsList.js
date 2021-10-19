import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

import Pagination from "./Pagination";
import News from "./News";
import Category from "./Category";

function NewsList() {

    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [newsPerPage] = useState(10);

    useEffect(() => {
        axios.get('/api/get-news').then(res => {
            if (res.status === 200) {
                setNews(res.data.news);
            }
            setLoading(false);
        })
    }, []);

    //GET CURRENT SLIDERS
    const indexOfLastNews = currentPage * newsPerPage;
    const indexOfFirstNews = indexOfLastNews - newsPerPage;
    const currentNews = news.slice(indexOfFirstNews, indexOfLastNews);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber)

    return (
        <div id="content" className="site-content">
            {/* <!-- Breadcrumb --> */}
            <div id="breadcrumb">
                <div className="container">
                    <h2 className="title">Tin tức</h2>

                    <ul className="breadcrumb" style={{ display: 'contents' }}>
                        <li><Link to="/" title="Home">Trang chủ</Link></li>
                        <li><span>Tin tức</span></li>
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
                        <div className="blog-list layout-2">
                            <div className="posts-list">
                                <News newsList={currentNews} loading={loading} />
                            </div>

                            <Pagination
                                newsPerPage={newsPerPage}
                                totalNews={news.length}
                                currentPage={currentPage}
                                lengthPage={currentNews.length}
                                paginate={paginate}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NewsList;