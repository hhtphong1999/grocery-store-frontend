import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import Pagination from './Pagination';
import Categories from './Categories';

function CategoryList() {

    const [loading, setLoading] = useState(true);
    const [categoryList, setCategoryList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [categoriesPerPage] = useState(10);

    useEffect(() => {
        axios.get('/api/view-category').then(res => {
            if (res.status === 200) {
                setCategoryList(res.data.categories);
            }
            setLoading(false);
        })
    }, []);

    const deleteCategory = (e, id) => {
        e.preventDefault();
        const thisClicked = e.currentTarget;

        swal("Bạn có chắc muốn xoá loại sản phẩm này?", {
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

                axios.delete(`/api/delete-category/${id}`).then(res => {
                    if (res.data.status === 200) {
                        swal('Success', res.data.message, 'success');
                        const newCategories = categoryList.filter(category => category.id !== id)
                        setCategoryList(newCategories);
                    } else if (res.data.status === 404) {
                        swal('Fail', res.data.message, 'fail');
                        thisClicked.innerText = "Delete";
                    };
                });
            }
            return false;
        });

    }

    //GET CURRENT CATEGORIES
    const indexOfLastCategory = currentPage * categoriesPerPage;
    const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
    const currentCategories = categoryList.slice(indexOfFirstCategory, indexOfLastCategory);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber)

    return (
        <div className="px-3">
            {/* <!-- Content Header (Page header) --> */}
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>Loại sản phẩm</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><Link to="/admin/dashboard">Dashboard</Link></li>
                                <li className="breadcrumb-item active">Loại sản phẩm</li>
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
                        <h3 className="card-title text-xl">Danh sách loại sản phẩm</h3>
                    </div>
                    {/* <!-- /.card-header --> */}
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-bordered table-striped">
                                <thead>
                                    <tr>
                                        <th className="text-center">ID</th>
                                        <th className="text-center">Tên</th>
                                        <th className="text-center">Slug</th>
                                        <th className="text-center">Trạng thái</th>
                                        <th>&nbsp;</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    <Categories categoryList={currentCategories} deleteCategory={deleteCategory} loading={loading} />
                                </tbody>
                            </table>

                            <Pagination
                                categoriesPerPage={categoriesPerPage}
                                totalCategories={categoryList.length}
                                first={indexOfFirstCategory}
                                last={indexOfLastCategory}
                                lengthPage={currentCategories.length}
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

export default CategoryList;