import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';

function AddBrand() {

    const [brandInput, setBrand] = useState({
        name: '',
        phone_number: '',
        address: '',
        slug: ''
    });

    const [description, setDescription] = useState('');
    const inputHandler = (event, editor) => {
        setDescription(editor.getData());
    };

    const [status, setStatus] = useState([]);
    const [errors, setErrors] = useState([]);

    const handleInput = (e) => {
        e.persist();
        setBrand({ ...brandInput, [e.target.name]: e.target.value });
    };

    const handleStatus = (e) => {
        e.persist();
        setStatus({ ...status, [e.target.name]: e.target.checked });
    }

    const submitBrand = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', brandInput.name);
        formData.append('phone_number', brandInput.phone_number);
        formData.append('address', brandInput.address);
        formData.append('description', description);
        formData.append('slug', brandInput.slug);
        formData.append('status', status.status ? 1 : 0);

        axios.post('api/store-brand', formData).then(res => {
            if (res.data.status === 200) {
                swal('Success', res.data.message, 'success');
                setBrand({
                    ...brandInput,
                    name: '',
                    phone_number: '',
                    address: '',
                    slug: ''
                });
                setDescription('');
                setErrors([]);
                document.getElementById("status").checked = false;  // clear checkbox status
            } else if (res.data.status === 422) {
                swal('Errors', '', 'error');
                setErrors(res.data.errors);
            };
        });
    }

    return (
        <div>
            {/* <!-- Content Header (Page header) --> */}
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>Thương hiệu</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><Link to="/admin/dashboard">Dashboard</Link></li>
                                <li className="breadcrumb-item active">Thương hiệu</li>
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
                            <h3 className="card-title text-xl">Thêm thương hiệu</h3>
                        </div>

                        <form onSubmit={submitBrand}>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Tên thương hiệu</label>
                                            <input type="text" name="name" onChange={handleInput} value={brandInput.name} className="form-control" required />
                                            <small className="text-danger">{errors.name}</small>
                                        </div>

                                        <div className="form-group">
                                            <label>Số điện thoại</label>
                                            <input type="text" name="phone_number" onChange={handleInput} value={brandInput.phone_number} className="form-control" />
                                            <small className="text-danger">{errors.phone_number}</small>
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Slug</label>
                                            <input type="text" name="slug" onChange={handleInput} value={brandInput.slug} className="form-control" />
                                            <small className="text-danger">{errors.slug}</small>
                                        </div>

                                        <div className="form-group">
                                            <label>Địa chỉ</label>
                                            <input type="text" name="address" onChange={handleInput} value={brandInput.address} className="form-control" />
                                            <small className="text-danger">{errors.address}</small>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label>Mô tả</label>
                                            <CKEditor
                                                id="description"
                                                data={description}
                                                editor={ClassicEditor}
                                                onChange={inputHandler}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="form-check">
                                        <input type="checkbox" name="status" id="status" onChange={handleStatus} checked={status.status} className="form-check-input" />
                                        <label className="form-check-label ml-4">Ẩn thương hiệu</label>
                                    </div>
                                </div>
                            </div>
                            <div className="card-footer">
                                <Link to="/admin/brand-list" className="btn2 btn2-lg btn2-primary2 mr-3"><span>Trở lại</span></Link>
                                <button type="submit" className="btn2 btn2-lg btn2-primary2">Thêm</button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default AddBrand;