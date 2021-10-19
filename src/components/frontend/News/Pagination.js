import React from "react";
import { Link } from "react-router-dom";

const Pagination = ({ newsPerPage, totalNews, paginate, currentPage}) => {

    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalNews / newsPerPage); i++) {
        pageNumbers.push(i);
    };

    return (
        <div className="pagination-bar">
            <div className="pagination">
                <ul className="page-list">
                    <li>
                        <Link 
                            to="#" 
                            onClick={() => {if(currentPage > 1) paginate(currentPage - 1) }} 
                            className="prev">Previous
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
                            onClick={() => {if(currentPage < pageNumbers.length) paginate(currentPage + 1) }} 
                            className="next">Next
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Pagination;