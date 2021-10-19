import React from "react";
import { Link } from "react-router-dom";
import * as CONFIG from '../../../constants/config';

const Products = ({ loading, products, deleteProduct }) => {

    if (loading) {
        return <tr><td><h4>Loading Product List...</h4></td></tr>;
    }

    return (
        products.map((item) => {
            return (
                <tr key-={item.id}>
                    <td className="text-center">{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.slug}</td>
                    <td>{CONFIG.CONVERT_TO_VND(item.selling_price)}</td>
                    <td>
                        {item.status === 0 ?
                            <label className="btn2 btn2-success btn2-lg w-100" >Active</label> :
                            <label className="btn2 btn2-warning2 btn2-lg w-100" >Deactive</label>}
                    </td>
                    <td>
                        <a href={CONFIG.BASE_URL + `${item.image}`} rel="noreferrer" target="_blank" >
                            <img src={CONFIG.BASE_URL + `${item.image}`} width="70px" alt={item.name} />
                        </a>
                    </td>
                    <td className="text-center">
                        <Link to={`edit-product/${item.id}`} className="btn2 btn2-primary2 btn2-lg mr-3">Edit</Link>
                        <button type="button" onClick={(e) => deleteProduct(e, item.id)} className="btn2 btn2-danger2 btn2-lg">Delete</button>
                    </td>
                </tr>
            )
        })
    );
}

export default Products;