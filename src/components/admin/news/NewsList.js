import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import News from './News';
import Pagination from './Pagination';

function NewsList() {

    const [loading, setLoading] = useState(true);
    const [newsList, setNewsList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [newsPerPage] = useState(10);

    useEffect(() => {
        axios.get('/api/view-news').then(res => {
            if (res.status === 200) {
                setNewsList(res.data.news);
            }
            setLoading(false);
        })
    }, []);

    const deleteNews = (e, id) => {
        e.preventDefault();
        const thisClicked = e.currentTarget;

        swal("Bạn có chắc muốn xoá tin này?", {
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

                axios.delete(`/api/delete-news/${id}`).then(res => {
                    if (res.data.status === 200) {
                        swal('Success', res.data.message, 'success');
                        const newNews = newsList.filter(news => news.id !== id)
                        setNewsList(newNews);
                    } else if (res.data.status === 404) {
                        swal('Fail', res.data.message, 'fail');
                        thisClicked.innerText = "Delete";
                    };
                });
            }
            return false;
        });

    }

    //GET CURRENT NEWS
    const indexOfLastNews = currentPage * newsPerPage;
    const indexOfFirstNews = indexOfLastNews - newsPerPage;
    const currentNews = newsList.slice(indexOfFirstNews, indexOfLastNews);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber)

    return (
        <div className="px-3">
            {/* <!-- Content Header (Page header) --> */}
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>Tin tức</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><Link to="/admin/dashboard">Dashboard</Link></li>
                                <li className="breadcrumb-item active">Tin tức</li>
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
                        <h3 className="card-title text-xl">Danh sách tin tức</h3>
                    </div>
                    {/* <!-- /.card-header --> */}
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-bordered table-striped">
                                <thead>
                                    <tr>
                                        <th className="text-center">ID</th>
                                        <th className="text-center">Tiêu đề</th>
                                        <th className="text-center">Thumbnail</th>
                                        <th className="text-center">Trạng thái</th>
                                        <th>&nbsp;</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    <News newsList={currentNews} deleteNews={deleteNews} loading={loading} />
                                </tbody>
                            </table>

                            <Pagination
                                newsPerPage={newsPerPage}
                                totalNews={newsList.length}
                                first={indexOfFirstNews}
                                last={indexOfLastNews}
                                lengthPage={currentNews.length}
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

export default NewsList;