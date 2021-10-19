import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';

import Pagination from './Pagination';
import Products from './Products';

function ProductList() {

    const [loading, setLoading] = useState(true);
    const [productList, setProductList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(10);

    useEffect(() => {
        axios.get('/api/view-product').then(res => {
            if (res.status === 200) {
                setProductList(res.data.products);
            }
            setLoading(false);
        })
    }, []);

    const deleteProduct = (e, id) => {
        e.preventDefault();
        const thisClicked = e.currentTarget;

        swal("Bạn có chắc muốn xoá sản phẩm này?", {
            buttons: {
                yes: {
                    text: "Yes",
                    value: "yes"
                },
                no: {
                    text: "No",
                    value: "no"
                }
            }
        }).then((value) => {
            if (value === "yes") {
                thisClicked.innerText = "Deleting";

                axios.delete(`/api/delete-product/${id}`).then(res => {
                    if (res.data.status === 200) {
                        swal('Success', res.data.message, 'success');
                        const newProducts = productList.filter(product => product.id !== id)
                        setProductList(newProducts);
                    } else if (res.data.status === 404) {
                        swal('Fail', res.data.message, 'fail');
                        thisClicked.innerText = "Delete";
                    };
                });
            }
            return false;
        });
    }

    //GET CURRENT PRODUCTS
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = productList.slice(indexOfFirstProduct, indexOfLastProduct);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber)

    return (
        <div className="px-3">
            {/* <!-- Content Header (Page header) --> */}
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>Sản phẩm</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><Link to="/admin/dashboard">Dashboard</Link></li>
                                <li className="breadcrumb-item active">Sản phẩm</li>
                            </ol>
                        </div>
                    </div>
                </div>
                {/* <!-- /.container-fluid --> */}
            </section>

            {/* <!-- Main content --> */}
            <section className="content">
                <div className="card card-primary">
                    <div className="card-header">
                        <h3 className="card-title text-xl">Danh sách sản phẩm</h3>
                    </div>
                    {/* <!-- /.card-header --> */}
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-bordered table-striped">
                                <thead>
                                    <tr>
                                        <th className="text-center">ID</th>
                                        <th className="text-center">Tên sản phẩm</th>
                                        <th className="text-center">Slug</th>
                                        <th className="text-center">Giá bán</th>
                                        <th className="text-center">Trạng thái</th>
                                        <th className="text-center">Ảnh</th>
                                        <th>&nbsp;</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    <Products products={currentProducts} deleteProduct={deleteProduct} loading={loading}  />
                                </tbody>
                            </table>

                            <Pagination
                                productsPerPage={productsPerPage}
                                totalProducts={productList.length}
                                first={indexOfFirstProduct}
                                last={indexOfLastProduct}
                                lengthPage={currentProducts.length}
                                paginate={paginate}
                            />
                        </div>
                    </div>
                    {/* <!-- /.card-body --> */}
                </div>
                {/* <!-- /.card --> */}
            </section>
            {/* <!-- /.content --> */}
        </div>
    );
}

export default ProductList;