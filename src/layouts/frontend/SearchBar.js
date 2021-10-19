import React, { useEffect, useState } from "react";
import axios from "axios";
import * as CONFIG from '../../constants/config';
import { Link } from "react-router-dom";

const SearchBar = () => {

    const [option, setOption] = useState([]);
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('api/search-product').then(res => {
            if (res.status === 200) {
                setData(res.data.products);
            }
        });
    }, []);

    const onSearch = (keyword) => {
        var result = data;
        result = result.filter((product) => {
            return product.name.toLowerCase().indexOf(keyword) !== -1;
        });

        setOption(result);
    };

    return (
        <div className="form-search block-cart dropdown">
            <form>
                <input
                    type="text"
                    className="form-input"
                    placeholder="Nhập tên sản phẩm..."
                    onChange={(e) => onSearch(e.target.value)}
                />
                <button className="fa fa-search"></button>
            </form>

            <div className="dropdown-content">
                <div className="cart-content">
                    <table>
                        {
                            option.length === 0 ?
                                <tbody><tr><p className="text-center">Không tìm thấy sản phẩm</p></tr></tbody> :
                                <tbody style={{ display: 'block', maxHeight: '400px', overflow: 'auto' }}>
                                    {option.map(v => (
                                        <tr key={v.id}>
                                            <td className="product-image">
                                                <Link to={`/product-detail/${v.slug}`}>
                                                    <img src={CONFIG.BASE_URL + `${v.image}`} alt="Product" />
                                                </Link>
                                            </td>
                                            <td>
                                                <div className="product-name">
                                                    <Link to={`/product-detail/${v.slug}`}>{v.name}</Link>
                                                </div>
                                                <div>
                                                    <span className="product-price">
                                                        {CONFIG.CONVERT_TO_VND(v.selling_price)}
                                                    </span>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>

                        }
                    </table>
                </div>
            </div>
        </div>
    );
}

export default SearchBar;