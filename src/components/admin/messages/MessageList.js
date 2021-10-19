import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";

import Messages from "./Messages";
import Pagination from "./Pagination";

function MessageList() {

    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [messagesPerPage] = useState(10);

    useEffect(() => {
        axios.get('/api/view-messages').then(res => {
            if (res.data.status) {
                setMessages(res.data.messages);
            }
            setLoading(false);
        })
    }, []);

    const deleteMessage = (e, id) => {
        e.preventDefault();
        const thisClicked = e.currentTarget;

        swal("Bạn có chắc muốn xoá ý kiến này?", {
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

                axios.delete(`/api/delete-message/${id}`).then(res => {
                    if (res.data.status === 200) {
                        swal('Thành công', res.data.message, 'success');
                        const newMessages = messages.filter(message => message.id !== id)
                        setMessages(newMessages);
                    } else if (res.data.status === 404) {
                        swal('Thất bại', res.data.message, 'fail');
                        thisClicked.innerText = "Delete";
                    };
                });
            }
            return false;
        });
    }

    //GET CURRENT Messages
    const indexOfLastMessages = currentPage * messagesPerPage;
    const indexOfFirstMessages = indexOfLastMessages - messagesPerPage;
    const currentMessages = messages.slice(indexOfFirstMessages, indexOfLastMessages);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber)

    return (
        <div className="px-3">
            {/* <!-- Content Header (Page header) --> */}
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>Ý kiến khách hàng</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><Link to="/admin/dashboard">Dashboard</Link></li>
                                <li className="breadcrumb-item active">Ý kiến khách hàng</li>
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
                        <h3 className="card-title text-xl">Danh sách ý kiến khách hàng</h3>
                    </div>
                    {/* <!-- /.card-header --> */}
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-bordered table-striped">
                                <thead>
                                    <tr>
                                        <th className="text-center">Tên khách hàng</th>
                                        <th className="text-center">Điện thoại</th>
                                        <th className="text-center">Email</th>
                                        <th className="text-center">Ngày gửi</th>
                                        <th className="text-center">Nội dung</th>
                                        <th>&nbsp;</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    <Messages messages={currentMessages} deleteMessage={deleteMessage} loading={loading} />
                                </tbody>
                            </table>

                            <Pagination
                                messagesPerPage={messagesPerPage}
                                totalMessages={messages.length}
                                first={indexOfFirstMessages}
                                last={indexOfLastMessages}
                                lengthPage={currentMessages.length}
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

export default MessageList;