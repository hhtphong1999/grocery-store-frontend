import React from 'react';
import { Link } from 'react-router-dom';
import * as CONFIG from '../../../constants/config';

const News = ({ newsList, loading, deleteNews }) => {

    if (loading) {
        return <tr><td><h4>Loading News List...</h4></td></tr>;
    }

    return (
        newsList.map(news => (
            <tr key={news.id}>
                <td className="text-center">{news.id}</td>
                <td>{news.title}</td>
                <td className="text-center"><img src={CONFIG.BASE_URL + `${news.thumbnail}`} width="70px" alt={news.name} /></td>
                <td className="text-center">
                    {news.status === 0 ?
                    <label className="btn2 btn2-success btn2-lg w-100">Hiện</label> :
                    <label className="btn2 btn2-warning2 btn2-lg w-100">Ẩn</label>}
                </td>
                <td className="text-center">
                    <Link to={`edit-news/${news.id}`} className="btn2 btn2-primary2 btn2-lg mr-3" style={{ width: '70px' }}>Sửa</Link>
                    <button type="button" onClick={(e) => deleteNews(e, news.id)} className="btn2 btn2-danger2 btn2-lg" style={{ width: '70px' }}>Xoá</button>
                </td>
            </tr>
        ))
    )
}

export default News;