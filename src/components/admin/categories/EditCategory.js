import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import swal from 'sweetalert';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

function EditCategory(props) {

    const history = useHistory();
    const [categoryInput, setCategory] = useState({
        name: '',
        slug: ''
    });
    const [description, setDescription] = useState('');
    const inputHandler = (event, editor) => {
        setDescription(editor.getData());
    };

    const [status, setStatus] = useState([]);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleInput = (e) => {
        e.persist();
        setCategory({ ...categoryInput, [e.target.name]: e.target.value });
    };

    const handleStatus = (e) => {
        e.persist();
        setStatus({ ...status, [e.target.name]: e.target.checked });
    }

    useEffect(() => {
        const category_id = props.match.params.id;
        axios.get(`/api/edit-category/${category_id}`).then(res => {
            if (res.data.status === 200) {
                setCategory(res.data.category);
                setStatus(res.data.category);
                setDescription(res.data.category.description);
            } else if (res.data.status === 404) {
                swal('Error', res.data.message, 'error');
                history.push('/admin/view-category');
            }
            setLoading(false);
        });
    }, [props.match.params.id, history]);

    const updateCategory = (e) => {
        e.preventDefault();

        const category_id = props.match.params.id;
        const formData = new FormData();
        formData.append('name', categoryInput.name);
        formData.append('slug', categoryInput.slug);
        formData.append('description', description);
        formData.append('status', status.status ? 1 : 0);

        axios.post(`api/update-category/${category_id}`, formData).then(res => {
            if (res.data.status === 200) {
                swal('Success', res.data.message, 'success');
                setErrors([]);
            } else if (res.data.status === 422) {
                swal('Errors', '', 'error');
                setErrors(res.data.errors);
            } else if (res.data.status === 404) {
                swal('Error', res.data.message, 'error');
                history.push('/admin/category-list');
            } else if (res.data.message === 500) {}
        });
    }

    if (loading) {
        return <h4>Edit Category is loading...</h4>;
    }

    return (
        <div>
            {/* <!-- Content Header (Page header) --> */}
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>Loại sản phẩm</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><Link to="/admin/dashboard">Dashboard</Link></li>
                                <li className="breadcrumb-item active">Loaị sản phẩm</li>
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
                            <h3 className="card-title text-xl">Cập nhật loại sản phẩm</h3>
                        </div>

                        <form onSubmit={updateCategory}>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Tên loại</label>
                                            <input type="text" name="name" onChange={handleInput} value={categoryInput.name} className="form-control" required />
                                            <small className="text-danger">{errors.name}</small>
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Slug</label>
                                            <input type="text" name="slug" onChange={handleInput} value={categoryInput.slug} className="form-control" required></input>
                                            <small className="text-danger">{errors.slug}</small>
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
                                        <label className="form-check-label ml-4">Ẩn loại sản phẩm</label>
                                    </div>
                                </div>
                            </div>
                            <div className="card-footer">
                                <Link to="/admin/category-list" className="btn2 btn2-lg btn2-primary2 mr-3"><span>Trở lại</span></Link>
                                <button type="submit" className="btn2 btn2-lg btn2-primary2">Cập nhật</button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default EditCategory;