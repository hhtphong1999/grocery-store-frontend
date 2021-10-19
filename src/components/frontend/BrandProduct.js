import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react/cjs/react.development';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';

import ProductGrid from './Products/ProductGrid';
import ProductList from './Products/ProductList';
import Pagination from './Products/Pagination';
import swal from 'sweetalert';

function BrandProduct(props) {

    const { onAddProduct } = props;
    const history = useHistory();
    const [products, setProducts] = useState([]);
    const [brand, setBrand] = useState('');
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortBy, setSortBy] = useState('0');
    const [defaultProducts, setDefaultProducts] = useState([]);
    const [productsPerPage] = useState(12);

    //GET CURRENT PRODUCTS
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber)

    useEffect(() => {
        const slug = props.match.params.slug;

        axios.get(`/api/brand-product/${slug}`).then(res => {
            if (res.data.status === 200) {
                setProducts(res.data.products);
                setDefaultProducts(res.data.products);
                setBrand(res.data.brand);
            } else if (res.data.status === 404) {
                swal('Thông báo', res.data.message, 'warning').then(
                    history.push('/404')
                );
            } else if (res.data.status === 400) {
                swal('Thông báo', res.data.message, 'warning');
            }
            setLoading(false);
        })
    }, [props.match.params.slug, history]);

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

    const onSortBy = (e) => {
        var sortby = e.target.value;
        setSortBy(sortby);

        if (sortby === '0') {
            console.log(defaultProducts)
            setProducts(defaultProducts);
        }

        if (sortby === '1') {
            const newProducts = products.sort((a, b) => a.selling_price - b.selling_price);
            setProducts(newProducts);
        }

        if (sortby === '2') {
            const newProducts = products.sort((a, b) => b.selling_price - a.selling_price);
            setProducts(newProducts);
        }

        if (sortby === '3') {
            const newProducts = products.sort((a, b) => b.id - a.id);
            setProducts(newProducts);
        }

        if (sortby === '4') {
            const newProducts = products.filter((product) => product.featured === 1);
            setProducts(newProducts);
        }
    }

    return (
        <div id="content" className="site-content">
            {/* <!-- Breadcrumb --> */}
            <div id="breadcrumb">
                <div className="container">
                    <h2 className="title">{brand}</h2>

                    <ul className="breadcrumb" style={{ display: 'contents' }}>
                        <li><Link to="/" title="Home">Trang chủ</Link></li>
                        <li><span>{brand}</span></li>
                    </ul>
                </div>
            </div>


            <div className="container">
                <div className="row">
                    {/* <!-- Page Content --> */}
                    <div id="center-column" className="col-lg-12 col-md-12">
                        <div className="product-category-page">
                            {/* <!-- Nav Bar --> */}
                            <div className="products-bar">
                                <div className="row">
                                    <div className="col-md-6 col-xs-6">
                                        <div className="gridlist-toggle" role="tablist">
                                            <ul className="nav nav-tabs">
                                                <li className="active"><a href="#products-grid" data-toggle="tab" aria-expanded="true"><i className="fa fa-th-large"></i></a></li>
                                                <li><a href="#products-list" data-toggle="tab" aria-expanded="false"><i className="fa fa-bars"></i></a></li>
                                            </ul>
                                        </div>

                                        <div className="total-products">Hiện có {products.length} sản phẩm</div>
                                    </div>

                                    <div className="col-md-6 col-xs-6">
                                        <div className="filter-bar">
                                            <form action="#" className="pull-right">
                                                <div className="select">
                                                    <select className="form-control w-100" onChange={onSortBy} value={sortBy}>
                                                        <option value="0">Sắp xếp mặc định</option>
                                                        <option value="1">Giá: Thấp đến cao</option>
                                                        <option value="2">Giá: Cao đến thấp</option>
                                                        <option value="3">Sản phẩm mới nhất</option>
                                                        <option value="4">Sản phẩm nổi bật</option>
                                                    </select>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="tab-content">
                                {/* <!-- Products Grid --> */}
                                <div className="tab-pane active" id="products-grid">
                                    <div className="products-block">
                                        <div className="row">
                                            <ProductGrid products={currentProducts} onAddProduct={onAddProduct} />
                                        </div>
                                    </div>
                                </div>

                                {/* <!-- Products List --> */}
                                <div className="tab-pane" id="products-list">
                                    <div className="products-block layout-5">
                                        <ProductList products={currentProducts} onAddProduct={onAddProduct} />
                                    </div>
                                </div>
                            </div>

                            <Pagination
                                productsPerPage={productsPerPage}
                                totalProducts={products.length}
                                paginate={paginate}
                                first={indexOfFirstProduct}
                                last={indexOfLastProduct}
                                lengthPage={currentProducts.length}
                                currentPage={currentPage}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default BrandProduct;