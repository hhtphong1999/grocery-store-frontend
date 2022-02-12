import React from 'react';
import { Link } from 'react-router-dom';

const Categories = ({ categoryList, loading, deleteCategory }) => {

    if (loading) {
        return <tr><td><h4>Loading Category List...</h4></td></tr>;
    }

    return (
        categoryList.map(item => (
                <tr key={item.id}>
                    <td className="text-center">{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.slug}</td>
                    <td className="text-center">
                        {item.status === 0 ?
                            <label className="btn2 btn2-success btn2-lg w-75">Hiện</label> :
                            <label className="btn2 btn2-warning2 btn2-lg w-75">Ẩn</label>}
                    </td>
                    <td className="text-center">
                        <Link to={`edit-category/${item.id}`} className="btn2 btn2-primary2 btn2-lg mr-3" style={{ width: '70px' }}>Sửa</Link>
                        <button type="button" onClick={(e) => deleteCategory(e, item.id)} className="btn2 btn2-danger2 btn2-lg" style={{ width: '70px' }}>Xoá</button>
                    </td>
                </tr>
        ))
    )
}

export default Categories;