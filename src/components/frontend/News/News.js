import React from 'react';
import * as CONFIG from '../../../constants/config';
import { Link } from 'react-router-dom';

const News = ({ newsList, loading }) => {

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
        newsList.map(news => (
            <div className="post-item" key={news.id}>
                <div className="row">
                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12 post-left">
                        <div className="post-image">
                            <Link to={`/news/${news.slug}`}>
                                <img className="img-responsive" src={CONFIG.BASE_URL+`${news.thumbnail}`} alt={news.title} />
                            </Link>
                        </div>
                    </div>

                    <div className="col-lg-8 col-md-8 col-sm-8 col-xs-12 post-right">
                        <Link className="post-title" to={`/news/${news.slug}`}>{news.title}</Link>
                        <div className="post-info">
                            <span className="date item"><i className="zmdi zmdi-calendar-note"></i>{CONFIG.CONVERT_DATETIME(news.created_at)}</span>
                        </div>
                        <div className="post-description">
                            {news.excerpt}...
                            <span className="post-readmore"><Link to={`/news/${news.slug}`}>view more</Link></span>
                        </div>
                    </div>
                </div>
            </div>
        ))
    )
}

export default News;