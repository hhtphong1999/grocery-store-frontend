import React from 'react';
import { Link } from 'react-router-dom';

const Pagination = ({ messagesPerPage, totalMessages, paginate, first, last, lengthPage }) => {

    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalMessages / messagesPerPage); i++) {
        pageNumbers.push(i);
    };

    return (
        <div className="row">
            <div className="col-md-5">
                <div className="dataTables_info">
                    Showing {first + 1} to {last - (messagesPerPage - lengthPage)} of {totalMessages} entries
                </div>
            </div>

            <div className="col-md-7">
                <div className="dataTables_paginate paging_simple_numbers">
                    <ul className="pagination">
                        {pageNumbers.map(number => (
                            <li key={number} className="pagination_button page-item">
                                <Link onClick={() => paginate(number)} to="#" className="page-link" >
                                    {number}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Pagination;