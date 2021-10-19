import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Category = () => {
    const [categoryList, setCategoryList] = useState([]);
    
    useEffect(() => {
        axios.get('/api/get-categories').then(res => {
            if (res.status === 200) {
                setCategoryList(res.data.categories);
            };
        });
    }, []);

    return (
        categoryList.map(item => (
            <div key={item.id} className="item">
                <Link className="category-title" to={`/category/${item.slug}`}>{item.name}</Link>
            </div>
        ))
    )
};

export default Category;