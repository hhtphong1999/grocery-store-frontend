import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as CONFIG from '../../../constants/config';

import DonutChart from './DonutChart';
import Barchart from './Barchart';
import RevenueLineChart from './RevenueLineChart';

function Dashboard() {

    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState(0);
    const [newOrders, setNewOrders] = useState(0);
    const [successRate, setSuccessRate] = useState(0);
    const [bestSeller, setBestSeller] = useState([]);
    const [revenuePerMonth, setRevenuePerMonth] = useState([]);

    useEffect(() => {
        axios.get('/api/get-all').then(res => {
            if (res.status === 200) {
                setUsers(res.data.users);
                setNewOrders(res.data.new_orders);
                setSuccessRate(res.data.success_rate);
                setBestSeller(res.data.best_seller);
                setRevenuePerMonth(res.data.sales_per_month);
            }
            setLoading(false);
        })
    }, [])

    if (loading) {
        return <tr><td><h4>Loading Dashboard...</h4></td></tr>;
    }

    return (
        <div>
            {/* <!-- Content Header (Page header) --> */}
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0">Dashboard</h1>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- /.content-header --> */}

            {/* <!-- Main content --> */}
            <section className="content">
                <div className="container-fluid">
                    {/* <!-- Small boxes (Stat box) --> */}
                    <div className="row">
                        <div className="col-lg-3 col-6">
                            {/* <!-- small box --> */}
                            <div className="small-box bg-info">
                                <div className="inner">
                                    <h3>{newOrders}</h3>

                                    <h5>Đơn đặt hàng mớI</h5>
                                </div>
                                <div className="icon">
                                    <i className="ion ion-bag"></i>
                                </div>
                                <Link to="/admin/order-list" className="small-box-footer">More info <i className="fas fa-arrow-circle-right"></i></Link>
                            </div>
                        </div>
                        {/* <!-- ./col --> */}
                        <div className="col-lg-3 col-6">
                            {/* <!-- small box --> */}
                            <div className="small-box bg-success">
                                <div className="inner">
                                    <h3>{Math.ceil(successRate * 100)}%</h3>

                                    <h5>Tỷ lệ giao hàng thành công</h5>
                                </div>
                                <div className="icon">
                                    <i className="ion ion-stats-bars"></i>
                                </div>
                                <Link to="/admin/order-list" className="small-box-footer">More info <i className="fas fa-arrow-circle-right"></i></Link>
                            </div>
                        </div>
                        {/* <!-- ./col --> */}
                        <div className="col-lg-3 col-6">
                            {/* <!-- small box --> */}
                            <div className="small-box bg-warning">
                                <div className="inner">
                                    <h3>{users}</h3>

                                    <h5>Khách hàng đã đăng ký</h5>
                                </div>
                                <div className="icon">
                                    <i className="ion ion-person-add"></i>
                                </div>
                                <label className="small-box-footer"><i class="fas fa-users"></i></label>
                            </div>
                        </div>
                        {/* <!-- ./col --> */}
                        <div className="col-lg-3 col-6">
                            {/* <!-- small box --> */}
                            <div className="small-box bg-danger">
                                <div className="inner">
                                    <h4>{CONFIG.CONVERT_TO_VND(revenuePerMonth.reduce((a, c) => a + parseInt(c.total), 0))}</h4>

                                    <h5>Doanh thu tổng</h5>
                                </div>
                                <div className="icon">
                                    <i className="ion ion-pie-graph"></i>
                                </div>
                                <label className="small-box-footer"><i class="fas fa-hand-holding-usd"></i></label>
                            </div>
                        </div>
                        {/* <!-- ./col --> */}
                    </div>
                    {/* <!-- /.row --> */}
                    {/* <!-- Main row --> */}
                    <div className="row">
                        {/* <!-- Left col --> */}
                        <section className="col-lg-6 connectedSortable">
                            {/* <!-- Custom tabs (Charts with tabs)--> */}
                            <div className="card">
                                <div className="card-header">
                                    <h3 className="card-title text-lg">
                                        <i className="fas fa-chart-pie mr-1"></i>
                                        Top 10 sản phẩm bán chạy
                                    </h3>
                                    <div className="card-tools">
                                        <ul className="nav nav-pills ml-auto">
                                            <li className="nav-item">
                                                <a className="nav-link active" href="#revenue-chart" data-toggle="tab">Bar</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" href="#sales-chart" data-toggle="tab">Donut</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                {/* <!-- /.card-header --> */}
                                <div className="card-body">
                                    <div className="tab-content p-0">
                                        {/* <!-- Morris chart - Sales --> */}
                                        <div className="chart tab-pane active" id="revenue-chart" style={{ position: 'relative', height: '300px' }}>
                                            <Barchart data={bestSeller} /> 
                                        </div>

                                        <div className="chart tab-pane" id="sales-chart" style={{ position: 'relative', height: '300px' }}>
                                            <DonutChart data={bestSeller} />
                                        </div>
                                    </div>
                                </div>
                                {/* <!-- /.card-body --> */}
                            </div>
                            {/* <!-- /.card --> */}
                        </section>
                        {/* <!-- /.Left col --> */}
                        
                        {/* <!-- right col (We are only adding the ID to make the widgets sortable)--> */}
                        <section className="col-lg-6 connectedSortable">

                        <div className="card">
                                <div className="card-header">
                                    <h3 className="card-title text-lg">
                                        <i class="fas fa-dollar-sign mr-1"></i>
                                        Doanh thu tháng
                                    </h3>

                                    <div className="card-tools">
                                        <ul className="nav nav-pills ml-auto">
                                            <li className="nav-item">
                                                <Link className="nav-link bg-white" to="#">Đơn vị tính: VND</Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                {/* <!-- /.card-header --> */}
                                <div className="card-body">
                                    <div className="tab-content p-0">
                                        {/* <!-- Morris chart - Sales --> */}
                                        <div className="chart tab-pane active" id="revenue-chart" style={{ position: 'relative', height: '300px' }}>
                                            <RevenueLineChart data={revenuePerMonth} />
                                        </div>
                                    </div>
                                </div>
                                {/* <!-- /.card-body --> */}
                            </div>
                            {/* <!-- /.card --> */}

                        </section>
                        {/* <!-- right col --> */}
                    </div>
                    {/* <!-- /.row (main row) --> */}
                </div>
                {/* <!-- /.container-fluid --> */}
            </section>
            {/* <!-- /.content --> */}
        </div>
    );
}

export default Dashboard;