import React from "react";
import { Link } from "react-router-dom";

const Pagination = ({ productsPerPage, totalProducts, paginate, first, last, lengthPage, currentPage }) => {

    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
        pageNumbers.push(i);
    };

    return (
        <div className="pagination-bar">
            <div className="row">
                <div className="col-md-4 col-sm-4 col-xs-12">
                    <div className="text">Đang hiển thị {first + 1}-{last - (productsPerPage - lengthPage)} trên {totalProducts} sản phẩm</div>
                </div>

                <div className="col-md-8 col-sm-8 col-xs-12">
                    <div className="pagination">
                        <ul className="page-list">
                            <li>
                                <Link
                                    to="#"
                                    onClick={() => { if (currentPage > 1) paginate(currentPage - 1) }}
                                    className="prev">Trước
                                </Link>
                            </li>
                            {
                                pageNumbers.map(number => (
                                    <li key={number}>
                                        <Link
                                            onClick={() => paginate(number)}
                                            to="#"
                                            className={currentPage === number ? 'current' : ''}
                                        >
                                            {number}
                                        </Link>
                                    </li>
                                ))
                            }
                            <li>
                                <Link
                                    to="#"
                                    onClick={() => { if (currentPage < pageNumbers.length) paginate(currentPage + 1) }}
                                    className="next">Tiếp
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Pagination;