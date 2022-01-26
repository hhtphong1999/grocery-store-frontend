import axios from 'axios';
import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

function AddNews() {

    const [newsInput, setNews] = useState({
        title: '',
        slug: '',
        excerpt: '',
        view_360: ''
    });
    const [body, setBody] = useState('');
    const inputHandler = (event, editor) => {
        setBody(editor.getData());
    };

    const [thumbnail, setThumbnail] = useState([]);
    const [status, setStatus] = useState([]);
    const [errors, setErrors] = useState([]);
    const ref = useRef();

    const handleInput = (e) => {
        e.persist();
        setNews({ ...newsInput, [e.target.name]: e.target.value });
    };

    const handleThumbnail = (e) => {
        setThumbnail({ image: e.target.files[0] });
    }

    const handleStatus = (e) => {
        e.persist();
        setStatus({ ...status, [e.target.name]: e.target.checked });
    }

    const submitNews = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', newsInput.title);
        formData.append('slug', newsInput.slug);
        formData.append('excerpt', newsInput.excerpt);
        formData.append('view_360', newsInput.view_360);
        formData.append('body', body);
        formData.append('thumbnail', thumbnail.image);
        formData.append('status', status.status ? 1 : 0);

        axios.post('api/store-news', formData).then(res => {
            if (res.data.status === 200) {
                swal('Success', res.data.message, 'success');
                setNews({
                    ...newsInput,
                    title: '',
                    slug: '',
                    excerpt: '',
                    view_360: ''
                });
                setBody('');
                setErrors([]);
                ref.current.value = '';     // clear image file input
                document.getElementById("status").checked = false;  // clear checkbox status
            } else if (res.data.status === 422) {
                swal('Errors', 'Vui lòng kiểm tra lại', 'error');
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

            <section className="content">
                <div className="container-fluid">
                    <div className="card card-primary">
                        <div className="card-header">
                            <h3 className="card-title text-xl">Thêm tin tức</h3>
                        </div>

                        <form onSubmit={submitNews} encType="multipart/form-data">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Tiêu đề</label>
                                            <input type="text" name="title" onChange={handleInput} value={newsInput.title} className="form-control" required />
                                            <small className="text-danger">{errors.title}</small>
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Slug</label>
                                            <input type="text" name="slug" onChange={handleInput} value={newsInput.slug} className="form-control" required></input>
                                            <small className="text-danger">{errors.slug}</small>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Thumbnail</label>
                                            <input type="file" ref={ref} name="thumbnail" onChange={handleThumbnail} className="form-control" required />
                                            <small className="text-danger">{errors.thumbnail}</small>
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Trích đoạn</label>
                                            <input type="text" name="excerpt" onChange={handleInput} value={newsInput.excerpt} className="form-control" required></input>
                                            <small className="text-danger">{errors.excerpt}</small>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Ảnh 360 độ</label>
                                            <input type="text" name="view_360" onChange={handleInput} value={newsInput.view_360} className="form-control"></input>
                                            <small className="text-danger">{errors.view_360}</small>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label>Nội dung</label>
                                            <CKEditor
                                                id="body"
                                                data={body}
                                                editor={ClassicEditor}
                                                onChange={inputHandler}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-check">
                                            <input type="checkbox" name="status" id="status" onChange={handleStatus} checked={status.status} className="form-check-input" />
                                            <label className="form-check-label ml-4">Ẩn tin</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card-footer">
                                <Link to="/admin/news-list" className="btn2 btn2-lg btn2-primary2 mr-3"><span>Trở lại</span></Link>
                                <button type="submit" className="btn2 btn2-lg btn2-primary2">Thêm</button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default AddNews;