import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import Sliders from './Sliders';
import Pagination from './Pagination';

function SliderList() {

    const [loading, setLoading] = useState(true);
    const [sliderList, setSliderList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [slidersPerPage] = useState(5);

    useEffect(() => {
        axios.get('/api/view-slider').then(res => {
            if (res.status === 200) {
                setSliderList(res.data.slider);
            }
            setLoading(false);
        })
    }, []);

    const deleteSlider = (e, id) => {
        e.preventDefault();
        const thisClicked = e.currentTarget;

        swal("Bạn có chắc muốn xoá slider này?", {
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

                axios.delete(`/api/delete-slider/${id}`).then(res => {
                    if (res.data.status === 200) {
                        swal('Success', res.data.message, 'success');
                        const newSliders = sliderList.filter(slider => slider.id !== id)
                        setSliderList(newSliders);
                    } else if (res.data.status === 404) {
                        swal('Fail', res.data.message, 'fail');
                        thisClicked.innerText = "Delete";
                    };
                });
            }
            return false;
        });

    }

    //GET CURRENT SLIDERS
    const indexOfLastSlider = currentPage * slidersPerPage;
    const indexOfFirstSlider = indexOfLastSlider - slidersPerPage;
    const currentSliders = sliderList.slice(indexOfFirstSlider, indexOfLastSlider);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber)

    return (
        <div className="px-3">
            {/* <!-- Content Header (Page header) --> */}
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>Slider</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><Link to="/admin/dashboard">Dashboard</Link></li>
                                <li className="breadcrumb-item active">Slider</li>
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
                        <h3 className="card-title text-xl">Danh sách Slider</h3>
                    </div>
                    {/* <!-- /.card-header --> */}
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-bordered table-striped">
                                <thead>
                                    <tr>
                                        <th className="text-center">ID</th>
                                        <th className="text-center">Tên</th>
                                        <th className="text-center">Đường dẫn</th>
                                        <th className="text-center">Trạng thái</th>
                                        <th className="text-center">Ảnh</th>
                                        <th>&nbsp;</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    <Sliders sliderList={currentSliders} deleteSlider={deleteSlider} loading={loading} />
                                </tbody>
                            </table>

                            <Pagination
                                slidersPerPage={slidersPerPage}
                                totalSliders={sliderList.length}
                                first={indexOfFirstSlider}
                                last={indexOfLastSlider}
                                lengthPage={currentSliders.length}
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

export default SliderList;