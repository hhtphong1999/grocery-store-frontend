import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import Brands from './Brands';
import Pagination from './Pagination';

function BrandList() {

    const [loading, setLoading] = useState(true);
    const [brandList, setBrandList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [brandsPerPage] = useState(10);

    useEffect(() => {
        axios.get('/api/view-brand').then(res => {
            if (res.status === 200) {
                setBrandList(res.data.brands);
            }
            setLoading(false);
        })
    }, []);

    const deleteBrand = (e, id) => {
        e.preventDefault();
        const thisClicked = e.currentTarget;

        swal("Bạn có chắc muốn xoá thương hiệu này?", {
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

                axios.delete(`/api/delete-brand/${id}`).then(res => {
                    if (res.data.status === 200) {
                        swal('Success', res.data.message, 'success');
                        const newBrands = brandList.filter(brand => brand.id !== id)
                        setBrandList(newBrands);
                    } else if (res.data.status === 404) {
                        swal('Fail', res.data.message, 'fail');
                        thisClicked.innerText = "Delete";
                    };
                });
            }
            return false;
        });

    }

    //GET CURRENT SLIDERS
    const indexOfLastBrand = currentPage * brandsPerPage;
    const indexOfFirstBrand = indexOfLastBrand - brandsPerPage;
    const currentBrands = brandList.slice(indexOfFirstBrand, indexOfLastBrand);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber)

    return (
        <div className="px-3">
            {/* <!-- Content Header (Page header) --> */}
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>Thương hiệu</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><Link to="/admin/dashboard">Dashboard</Link></li>
                                <li className="breadcrumb-item active">Thương hiệu</li>
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
                        <h3 className="card-title text-xl">Danh sách thương hiệu</h3>
                    </div>
                    {/* <!-- /.card-header --> */}
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-bordered table-striped">
                                <thead>
                                    <tr>
                                        <th className="text-center">ID</th>
                                        <th className="text-center">Tên</th>
                                        <th className="text-center">Điện thoại</th>
                                        <th className="text-center">Trạng thái</th>
                                        <th>&nbsp;</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    <Brands brandList={currentBrands} deleteBrand={deleteBrand} loading={loading} />
                                </tbody>
                            </table>

                            <Pagination
                                brandsPerPage={brandsPerPage}
                                totalBrands={brandList.length}
                                first={indexOfFirstBrand}
                                last={indexOfLastBrand}
                                lengthPage={currentBrands.length}
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

export default BrandList;