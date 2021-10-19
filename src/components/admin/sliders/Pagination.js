import React from 'react';

const Pagination = ({ slidersPerPage, totalSliders, paginate, first, last, lengthPage }) => {

    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalSliders / slidersPerPage); i++) {
        pageNumbers.push(i);
    };

    return (
        <div className="row">
            <div className="col-md-5">
                <div className="dataTables_info">
                    Showing {first + 1} to {last - (slidersPerPage - lengthPage)} of {totalSliders} entries
                </div>
            </div>

            <div className="col-md-7">
                <div className="dataTables_paginate paging_simple_numbers">
                    <ul className="pagination">
                        {pageNumbers.map(number => (
                            <li key={number} className="pagination_button page-item">
                                <a onClick={() => paginate(number)} href="#" className="page-link" >
                                    {number}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Pagination;