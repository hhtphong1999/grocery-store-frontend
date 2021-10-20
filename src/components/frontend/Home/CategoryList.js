import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';

function CategoryList() {

    const [categoryList, setCategoryList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('/api/get-categories').then(res => {
            if (res.status === 200) {
                setCategoryList(res.data.categories);
            };
            setLoading(false);
        });
    }, []);

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
        categoryList.map(item => (
            <div key={item.id} className="item">
                <Link className="category-title" to={`/category/${item.slug}`}>
                    {item.name}
                </Link>
            </div>
        ))
    )
}

export default CategoryList;