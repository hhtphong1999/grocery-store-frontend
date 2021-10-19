import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Orders from "./Orders";
import Pagination from "./Pagination";

function OrderList() {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [ordersPerPage] = useState(10);

    useEffect(() => {
        axios.get('/api/view-order').then(res => {
            if (res.data.status) {
                setOrders(res.data.orders);
            }
            setLoading(false);
        })
    }, []);

    //GET CURRENT Orders
    const indexOfLastOrders = currentPage * ordersPerPage;
    const indexOfFirstOrders = indexOfLastOrders - ordersPerPage;
    const currentOrders = orders.slice(indexOfFirstOrders, indexOfLastOrders);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber)

    return (
        <div className="px-3">
            {/* <!-- Content Header (Page header) --> */}
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>Đơn đặt hàng</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><Link to="/admin/dashboard">Dashboard</Link></li>
                                <li className="breadcrumb-item active">Đơn đặt hàng</li>
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
                        <h3 className="card-title text-xl">Danh sách đơn đặt hàng</h3>
                    </div>
                    {/* <!-- /.card-header --> */}
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-bordered table-striped">
                                <thead>
                                    <tr>
                                        <th className="text-center">ID</th>
                                        <th className="text-center">Tên khách hàng</th>
                                        <th className="text-center">Ngày đặt hàng</th>
                                        <th className="text-center">Trạng thái thanh toán</th>
                                        <th className="text-center">Trạng thái đơn hàng</th>
                                        <th>&nbsp;</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    <Orders orders={currentOrders} loading={loading} />
                                </tbody>
                            </table>

                            <Pagination
                                ordersPerPage={ordersPerPage}
                                totalOrders={orders.length}
                                first={indexOfFirstOrders}
                                last={indexOfLastOrders}
                                lengthPage={currentOrders.length}
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

export default OrderList;