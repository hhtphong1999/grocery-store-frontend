import React from "react";
import { Link } from "react-router-dom";

const Orders = ({ loading, orders }) => {

    if (loading) {
        return <tr><td><h4>Loading Order List...</h4></td></tr>;
    }

    return (
        orders.map(order => (
            <tr key={order.id}>
                <td className="text-center">{order.id}</td>
                <td>{order.name}</td>
                <td>{new Date(order.created_at).toLocaleString()}</td>
                <td className="text-center">
                    {order.payment_status === 'Chưa thanh toán' ?
                    <label className="btn2 btn2-danger2 btn2-lg">{order.payment_status}</label> :
                    <label className="btn2 btn2-success btn2-lg">{order.payment_status}</label>}
                </td>
                <td className="text-center">
                    {order.order_status.id === 4 ?
                    <label className="btn2 btn2-success btn2-lg">{order.order_status.name}</label>:
                    order.order_status.id === 5 ?
                    <label className="btn2 btn2-danger2 btn2-lg">{order.order_status.name}</label> :
                    <label className="btn2 btn2-warning2 btn2-lg">{order.order_status.name}</label>}
                </td>
                <td className="text-center">
                    <Link to={`order-detail/${order.id}`} className="btn2 btn2-primary2 btn2-lg mr-3" style={{ width: '70px' }}>Chi tiết</Link>
                </td>
            </tr>
        ))
    );
}

export default Orders;