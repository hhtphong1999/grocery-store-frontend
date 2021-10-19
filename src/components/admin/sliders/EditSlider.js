import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import swal from 'sweetalert';
import * as CONFIG from '../../../constants/config';

function EditSlider(props) {

    const history = useHistory();
    const [sliderInput, setSlider] = useState({
        name: '',
        url: '',
        sort_by: 1
    });

    const [image, setImage] = useState([]);
    const [status, setStatus] = useState([]);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(true);
    const ref = useRef();

    const handleInput = (e) => {
        e.persist();
        setSlider({ ...sliderInput, [e.target.name]: e.target.value });
    };

    const handleImage = (e) => {
        setImage({ image: e.target.files[0] });
    }

    const handleStatus = (e) => {
        e.persist();
        setStatus({ ...status, [e.target.name]: e.target.checked });
    }

    useEffect(() => {
        const slider_id = props.match.params.id;
        axios.get(`/api/edit-slider/${slider_id}`).then(res => {
            if (res.data.status === 200) {
                setSlider(res.data.slider);
                setStatus(res.data.slider);
            } else if (res.data.status === 404) {
                swal('Error', res.data.message, 'error');
                history.push('/admin/view-slider');
            }
            setLoading(false);
        });
    }, [props.match.params.id, history]);

    const updateSlider = (e) => {
        e.preventDefault();

        const slider_id = props.match.params.id;
        const formData = new FormData();
        formData.append('name', sliderInput.name);
        formData.append('url', sliderInput.url);
        formData.append('sort_by', sliderInput.sort_by);
        formData.append('image', image.image);
        formData.append('status', status.status ? 1 : 0);

        axios.post(`api/update-slider/${slider_id}`, formData).then(res => {
            if (res.data.status === 200) {
                swal('Success', res.data.message, 'success');
                setErrors([]);
            } else if (res.data.status === 422) {
                swal('Errors', '', 'error');
                setErrors(res.data.errors);
            } else if (res.data.status === 404) {
                swal('Error', res.data.message, 'error');
                history.push('/admin/view-slider');
            } else if (res.data.message === 500) {
                //console.log(res.data.message);
            }
        });
    }

    if (loading) {
        return <h4>Edit Slider is loading...</h4>;
    }

    return (
        <div>
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

            <section className="content">
                <div className="container-fluid">
                    <div className="card card-primary">
                        <div className="card-header">
                            <h3 className="card-title text-xl">Cập nhật Slider</h3>
                        </div>

                        <form onSubmit={updateSlider} encType="multipart/form-data">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Tên Slider</label>
                                            <input type="text" name="name" onChange={handleInput} value={sliderInput.name} className="form-control" required />
                                            <small className="text-danger">{errors.name}</small>

                                            <label>Sắp sếp</label>
                                            <input type="number" name="sort_by" onChange={handleInput} value={sliderInput.sort_by} min="1" max="10" className="form-control"></input>
                                            <small className="text-danger">{errors.sort_by}</small>
                                        </div>

                                        <div className="form-check">
                                            <input type="checkbox" name="status" id="status" onChange={handleStatus} defaultChecked={status.status === 1 ? true : false} className="form-check-input" />
                                            <label className="form-check-label ml-4">Ẩn Slider</label>
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Đường dẫn</label>
                                            <input type="text" name="url" onChange={handleInput} value={sliderInput.url} className="form-control" />

                                            <label>Ảnh Slide</label>
                                            <input type="file" ref={ref} name="image" onChange={handleImage} className="form-control mb-3" />
                                            <img src={CONFIG.BASE_URL + `${sliderInput.image}`} width="100px" alt={sliderInput.name} />
                                            <small className="text-danger">{errors.image}</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card-footer">
                                <Link to="/admin/slider-list" className="btn2 btn2-lg btn2-primary2 mr-3"><span>Trở lại</span></Link>
                                <button type="submit" className="btn2 btn2-lg btn2-primary2">Cập nhật</button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default EditSlider;